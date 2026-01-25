"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const trustItems = [
  "Licensed dentists",
  "Hospital-grade sterilization",
  "Gentle care for kids",
  "Transparent pricing",
  "Emergency-friendly slots"
];

export function TrustBar() {
  return (
    <section className="py-8">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-border bg-white/70 px-6 py-4 text-sm text-muted shadow-soft"
        >
          {trustItems.map((item) => (
            <motion.span key={item} variants={fadeUp}>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
