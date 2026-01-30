import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  return env;
}

const envFile = loadEnv(path.join(rootDir, ".env.local"));
const env = { ...envFile, ...process.env };

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const services = [
  {
    name: "Preventive Care & Cleanings",
    slug: "preventive-care",
    description:
      "Our preventive visits keep teeth strong and gums healthy through professional cleanings, detailed exams, and proactive guidance.",
    category: "Preventive",
    duration_min: 45,
    duration_max: 60,
    price_min: 1200,
    price_max: 2500,
    is_active: true,
    sort_order: 1,
  },
  {
    name: "Tooth-Colored Fillings",
    slug: "tooth-colored-fillings",
    description:
      "We restore cavities with durable, tooth-colored materials for a comfortable bite and natural finish.",
    category: "Restorative",
    duration_min: 30,
    duration_max: 60,
    price_min: 1800,
    price_max: 3500,
    is_active: true,
    sort_order: 2,
  },
  {
    name: "Gentle Extractions",
    slug: "gentle-extractions",
    description:
      "We use modern techniques to ensure safe, smooth extractions while keeping you comfortable throughout the visit.",
    category: "Surgical",
    duration_min: 30,
    duration_max: 90,
    price_min: 2500,
    price_max: 6000,
    is_active: true,
    sort_order: 3,
  },
  {
    name: "Aesthetic Whitening",
    slug: "aesthetic-whitening",
    description:
      "Customized whitening protocols lift stains and boost confidence while protecting enamel.",
    category: "Cosmetic",
    duration_min: 60,
    duration_max: 90,
    price_min: 4000,
    price_max: 8000,
    is_active: true,
    sort_order: 4,
  },
  {
    name: "Crowns & Bridges",
    slug: "crowns-bridges",
    description:
      "Our crowns and bridges repair damaged teeth and fill gaps for a stable, beautiful bite.",
    category: "Restorative",
    duration_min: 120,
    duration_max: 120,
    price_min: 8000,
    price_max: 20000,
    is_active: true,
    sort_order: 5,
  },
  {
    name: "Orthodontic Consultations",
    slug: "orthodontic-consults",
    description:
      "We assess alignment and provide clear treatment plans for teens and adults.",
    category: "Orthodontics",
    duration_min: 45,
    duration_max: 45,
    price_min: 1500,
    price_max: 2000,
    is_active: true,
    sort_order: 6,
  },
];

const { error } = await supabase
  .from("service")
  .upsert(services, { onConflict: "slug" });

if (error) {
  console.error("Failed to seed services:", error.message);
  process.exit(1);
}

console.log("Seeded services:", services.length);
