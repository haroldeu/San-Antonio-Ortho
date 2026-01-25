"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Testimonials"
          title="Patients love the calm, confident experience"
          description="Real feedback from patients who visit us for gentle, premium dental care."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 flex gap-6 overflow-x-auto pb-4"
        >
          {testimonials.map((item) => (
            <motion.div key={item.id} variants={fadeUp} className="min-w-[260px] flex-1">
              <Card className="h-full">
                <p className="text-sm text-muted">"{item.content}"</p>
                <div className="mt-4">
                  <p className="font-heading text-lg font-semibold text-slate">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
