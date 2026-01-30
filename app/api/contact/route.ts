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

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const message = normalize(payload.message);
  const phone =
    typeof payload.phone === "string" && payload.phone.trim().length > 0
      ? payload.phone.trim()
      : null;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone,
    message,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to submit message." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
