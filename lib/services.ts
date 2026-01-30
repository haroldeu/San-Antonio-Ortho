import { services as contentServices } from "@/data/services";
import { supabaseServer } from "@/lib/supabaseServer";
import type { Service } from "@/types";
import type { Database } from "@/types/supabase";

type ServiceRow = Database["public"]["Tables"]["service"]["Row"];

const contentBySlug = new Map(contentServices.map((service) => [service.slug, service]));

const formatDuration = (min: number, max: number) => {
  if (min === max) {
    return `${min} minutes`;
  }
  return `${min}-${max} minutes`;
};

const formatPriceRange = (min: number, max: number) => {
  const format = (value: number) => value.toLocaleString("en-PH");
  if (min === max) {
    return `PHP ${format(min)}`;
  }
  return `PHP ${format(min)} - ${format(max)}`;
};

const toServiceView = (row: ServiceRow): Service => {
  const content = contentBySlug.get(row.slug);
  return {
    id: row.id,
    slug: row.slug,
    title: content?.title ?? row.name,
    category: row.category,
    shortDescription: content?.shortDescription ?? row.description ?? "",
    description: content?.description ?? row.description ?? "",
    duration: formatDuration(row.duration_min, row.duration_max),
    priceRange: formatPriceRange(row.price_min, row.price_max),
    highlights: content?.highlights ?? [],
  };
};

export async function getServices() {
  const { data, error } = await supabaseServer
    .from("service")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Unable to load services.");
  }

  if (!data || data.length === 0) {
    return contentServices;
  }

  return data.map(toServiceView);
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabaseServer
    .from("service")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to load the requested service.");
  }

  if (!data) {
    return null;
  }

  return toServiceView(data);
}

export async function getServiceSlugs() {
  const { data, error } = await supabaseServer
    .from("service")
    .select("slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !data) {
    return contentServices.map((service) => ({ slug: service.slug }));
  }

  return data.map((item) => ({ slug: item.slug }));
}
