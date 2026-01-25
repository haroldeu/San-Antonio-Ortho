"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Answers to common questions"
          description="Everything you need to feel prepared for your next appointment."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 space-y-4"
        >
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div key={item.id} variants={fadeUp}>
                <Card>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="font-heading text-lg font-semibold text-slate">
                      {item.question}
                    </span>
                    <span className="text-primary-deep" aria-hidden>
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="mt-3 text-sm text-muted">{item.answer}</p>
                  ) : null}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
