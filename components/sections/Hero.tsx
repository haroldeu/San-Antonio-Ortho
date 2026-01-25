"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-border bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            Gentle. Modern. Trusted.
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-semibold text-slate md:text-5xl"
          >
            Premium dental care that feels calm, clean, and confidently professional.
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-xl text-base text-muted md:text-lg">
            St. Anthony Dental Clinic blends advanced dental technology with warm, personalized care.
            From preventive checkups to restorative treatments, we keep every visit comfortable.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link href="/book">
              <Button size="lg">Book Appointment</Button>
            </Link>
            <Link href="tel:+639175550123">
              <Button size="lg" variant="secondary">
                Call Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-lavender/40 blur-3xl" />
          <div className="rounded-3xl border border-border bg-white/80 p-8 shadow-soft">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                Next Available
              </p>
              <p className="font-heading text-2xl font-semibold text-slate">Today, 2:30 PM</p>
              <p className="text-sm text-muted">
                Secure your preferred time with a fast online request.
              </p>
              <Link href="/book">
                <Button className="w-full" variant="secondary">
                  Request Slot
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
