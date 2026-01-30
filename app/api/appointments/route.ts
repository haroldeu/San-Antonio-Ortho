import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

const supabase = createClient<Database>(
  supabaseUrl,
  serviceRoleKey ?? anonKey
);

type AppointmentPayload = {
  name?: string;
  email?: string;
  phone?: string;
  serviceSlug?: string;
  preferredDate?: string;
  preferredTime?: string | null;
  notes?: string | null;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let payload: AppointmentPayload;
  try {
    payload = (await req.json()) as AppointmentPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const phone = normalize(payload.phone);
  const serviceSlug = normalize(payload.serviceSlug);
  const preferred_date = normalize(payload.preferredDate);
  const preferred_time = normalize(payload.preferredTime) || null;
  const notes = normalize(payload.notes) || null;

  if (!name || !email || !phone || !serviceSlug || !preferred_date) {
    return NextResponse.json(
      { error: "Name, email, phone, service, and preferred date are required." },
      { status: 400 }
    );
  }

  const { data: service, error: serviceError } = await supabase
    .from("service")
    .select("id")
    .eq("slug", serviceSlug)
    .maybeSingle();

  if (serviceError) {
    return NextResponse.json(
      { error: "Unable to verify selected service." },
      { status: 500 }
    );
  }

  if (!service?.id) {
    return NextResponse.json(
      { error: "Selected service is not available." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("appointment_requests").insert({
    name,
    email,
    phone,
    "service.id": service.id,
    preferred_date,
    preferred_time,
    notes,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit appointment request." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
