import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    return (
      <section className="py-16 md:py-24">
        <Container className="space-y-6">
          <SectionHeading
            badge="Service"
            title="Service not found"
            description="We could not find the service you're looking for. Explore our full list below."
          />
          <Link href="/services">
            <Button variant="secondary">Back to services</Button>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10">
        <div className="space-y-4">
          <Badge>{service.category}</Badge>
          <h1 className="font-heading text-4xl font-semibold text-slate md:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-base text-muted md:text-lg">{service.description}</p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-muted">
            <span>{service.duration}</span>
            <span>{service.priceRange}</span>
          </div>
        </div>
        <Card>
          <h2 className="font-heading text-2xl font-semibold text-slate">What to expect</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted md:grid-cols-2">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl border border-border bg-white/70 px-4 py-3">
                {highlight}
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-wrap gap-4">
          <Link href="/book">
            <Button>Book this service</Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary">View all services</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}