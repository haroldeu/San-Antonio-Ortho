import { ServicesPageClient } from "@/components/services/ServicesPageClient";
import { getServices } from "@/lib/services";

export default async function ServicesPage() {
  const services = await getServices();
  const categories = Array.from(
    new Set(["All", ...services.map((service) => service.category)])
  );

  return <ServicesPageClient services={services} categories={categories} />;
}
