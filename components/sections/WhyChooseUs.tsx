"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Smile, Sparkles, Timer } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const highlights = [
  {
    title: "Comfort-first care",
    description: "We prioritize gentle techniques and a calming environment to reduce dental anxiety.",
    icon: Smile
  },
  {
    title: "Modern sterilization",
    description: "Hospital-grade sterilization protocols keep every visit safe and hygienic.",
    icon: ShieldCheck
  },
  {
    title: "Efficient appointments",
    description: "Streamlined scheduling and clear timelines respect your busy day.",
    icon: Timer
  },
  {
    title: "Radiant results",
    description: "Premium materials and detailed treatment planning deliver confident smiles.",
    icon: Sparkles
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Why choose us"
          title="A dental experience built on trust"
          description="We blend advanced care with the warmth of a neighborhood clinic."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {highlights.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <Card className="flex h-full flex-col gap-4">
                <item.icon className="h-8 w-8 text-primary-deep" aria-hidden />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-slate">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
