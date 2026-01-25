"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { services, serviceCategories } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter((service) => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Services"
          title="Care that adapts to your smile goals"
          description="Explore our full range of services and find the treatment that fits your needs."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {serviceCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                activeCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white/70 text-muted hover:text-primary-deep"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((service) => (
            <Card key={service.id} className="flex h-full flex-col justify-between">
              <div>
                <Badge className="mb-4">{service.category}</Badge>
                <h3 className="font-heading text-2xl font-semibold text-slate">{service.title}</h3>
                <p className="mt-3 text-sm text-muted">{service.shortDescription}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-muted">
                  <p>{service.duration}</p>
                  <p>{service.priceRange}</p>
                </div>
                <Link href={`/services/${service.slug}`}>
                  <Button size="sm" variant="secondary">
                    View details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
