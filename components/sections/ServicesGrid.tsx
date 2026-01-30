"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { Service } from "@/types";

type ServicesGridProps = {
  services: Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Services"
          title="Complete care for every smile"
          description="A curated selection of preventive, cosmetic, and restorative treatments tailored to your needs."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Link href={`/services/${service.slug}`}>
                <Card className="h-full transition duration-300 hover:scale-[1.02] hover:shadow-lift">
                  <Badge className="mb-4">{service.category}</Badge>
                  <h3 className="font-heading text-2xl font-semibold text-slate">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted">{service.shortDescription}</p>
                  <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                    <span>{service.duration}</span>
                    <span>{service.priceRange}</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
