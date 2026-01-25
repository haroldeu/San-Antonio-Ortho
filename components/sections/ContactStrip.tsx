"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ContactStrip() {
  return (
    <section className="py-12">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-white/80 p-8 shadow-soft md:flex-row md:items-center"
        >
          <motion.div variants={fadeUp}>
            <h3 className="font-heading text-2xl font-semibold text-slate">
              Ready for a brighter, healthier smile?
            </h3>
            <p className="mt-2 text-sm text-muted">
              Book your visit or reach out with any questions. We are here to help.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Link href="/book">
              <Button>Book Appointment</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
