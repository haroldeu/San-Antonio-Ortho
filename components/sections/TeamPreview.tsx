"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamMembers } from "@/data/team";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TeamPreview() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          badge="Our team"
          title="Meet the people behind your confident smile"
          description="Dedicated clinicians and hygienists who bring care, clarity, and calm to every visit."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={fadeUp}>
              <Card className="flex h-full flex-col gap-4">
                <div className="relative h-40 overflow-hidden rounded-2xl bg-lavender/40">
                  <Image
                    src={`${basePath}${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-slate">{member.name}</h3>
                  <p className="text-sm text-primary-deep">{member.role}</p>
                  <p className="mt-2 text-sm text-muted">{member.bio}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
                    {member.experience}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
