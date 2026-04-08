import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { sendCertificateRequestEmail } from "@/lib/mailer";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey ?? anonKey);

type CertificateRequestPayload = {
  name?: string;
  dateOfBirth?: string;
  age?: number | string;
  address?: string;
};

type CertificateAdminFieldsInput = {
  adminField1?: boolean;
  adminField2?: boolean;
  adminField3?: boolean;
  adminField4?: boolean;
  adminField5?: number | null;
  adminField6?: boolean;
  adminField7?: string;
  adminField8?: boolean;
  adminField9?: string;
  adminField10?: string;
  selectedSpecialNumbers?: number[];
};

type CertificateUpdatePayload = {
  status?: string;
  adminFields?: CertificateAdminFieldsInput;
  pdfUrl?: string | null;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function isAdminUser(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.slice(7);

  try {
    // Get the session from the token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return false;
    }

    // Check if the user is an admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_active, role")
      .eq("auth_id", user.id)
      .eq("is_active", true)
      .maybeSingle();

    return !!adminUser;
  } catch {
    return false;
  }
}

function getRequestId(req: Request) {
  return new URL(req.url).searchParams.get("id");
}

export async function GET(req: Request) {
  const requestId = getRequestId(req);

  // If requesting a specific request, check admin auth
  if (requestId) {
    const isAdmin = await isAdminUser(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("certificate_requests")
      .select("id, created_at, name, date_of_birth, age, address, admin_fields, pdf_url, status")
      .eq("id", requestId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "Failed to load certificate request." },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    return NextResponse.json({ request: data });
  }

  // List all requests - check admin auth
  const isAdmin = await isAdminUser(req);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("certificate_requests")
    .select(
      "id, created_at, name, date_of_birth, age, address, admin_fields, pdf_url, status",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to load certificate requests." },
      { status: 500 },
    );
  }

  return NextResponse.json({ requests: data ?? [] });
}

export async function PATCH(req: Request) {
  const isAdmin = await isAdminUser(req);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const requestId = getRequestId(req);
  if (!requestId) {
    return NextResponse.json({ error: "Missing request id." }, { status: 400 });
  }

  let payload: CertificateUpdatePayload;
  try {
    payload = (await req.json()) as CertificateUpdatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const updateData: {
    status?: string;
    admin_fields?: CertificateAdminFieldsInput;
    pdf_url?: string | null;
  } = {};

  if (typeof payload.status === "string" && payload.status.trim()) {
    updateData.status = normalize(payload.status);
  }

  if (payload.adminFields) {
    updateData.admin_fields = payload.adminFields;
  }

  if (payload.pdfUrl !== undefined) {
    updateData.pdf_url = payload.pdfUrl;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No update data provided." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("certificate_requests")
    .update(updateData)
    .eq("id", requestId)
    .select("id, created_at, name, date_of_birth, age, address, admin_fields, pdf_url, status")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update certificate request." },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json({ request: data });
}

export async function POST(req: Request) {
  let payload: CertificateRequestPayload;
  try {
    payload = (await req.json()) as CertificateRequestPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = normalize(payload.name);
  const dateOfBirth = normalize(payload.dateOfBirth);
  const ageValue =
    typeof payload.age === "number" ? payload.age : Number(payload.age);
  const address = normalize(payload.address);

  if (
    !name ||
    !dateOfBirth ||
    !address ||
    !Number.isInteger(ageValue) ||
    ageValue <= 0
  ) {
    return NextResponse.json(
      {
        error: "Name, date of birth, age, and address are required.",
      },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("certificate_requests").insert({
    name,
    date_of_birth: dateOfBirth,
    age: ageValue,
    address,
    status: "pending",
    admin_fields: {},
    pdf_url: null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit certificate request." },
      { status: 500 },
    );
  }

  try {
    await sendCertificateRequestEmail({
      name,
      dateOfBirth,
      age: ageValue,
      address,
    });
  } catch {
    return NextResponse.json(
      { error: "Request saved, but email notification failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
