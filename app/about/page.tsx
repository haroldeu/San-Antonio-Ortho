import Image from "next/image";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  HandHeart,
  Lightbulb,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const coreValues = [
  {
    title: "Compassion",
    description:
      "We treat every patient with kindness, empathy, and understanding, ensuring a comfortable and positive experience.",
    icon: Heart,
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest standards in dental care through continuous learning, modern technology, and skilled practice.",
    icon: Sparkles,
  },
  {
    title: "Integrity",
    description:
      "We uphold honesty, transparency, and ethical practices in all our services and patient interactions.",
    icon: ShieldCheck,
  },
  {
    title: "Patient-Centered Care",
    description:
      "We prioritize the needs, safety, and satisfaction of our patients in every treatment we provide.",
    icon: HandHeart,
  },
  {
    title: "Innovation",
    description:
      "We embrace advancements in dental technology to improve efficiency, accuracy, and overall patient care.",
    icon: Lightbulb,
  },
  {
    title: "Community Commitment",
    description:
      "We are dedicated to serving the community by promoting oral health awareness and providing accessible dental services.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10 md:space-y-12">
        <SectionHeading
          badge="About"
          title="The Story of St. Anthony Dental Clinic"
          description="A clinic shaped by compassionate care, thoughtful leadership, and a long-standing commitment to families in the community."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_1fr] lg:items-stretch">
          <Card className="h-full overflow-hidden p-0">
            <div className="relative h-full min-h-[460px] overflow-hidden">
              <Image
                src="/images/isabel_mendoza.jpg"
                alt="Dra. Isabel P. Mendoza"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </Card>

          <Card className="h-full space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep">
                Founder recognition
              </p>
              <h3 className="font-heading text-3xl font-semibold text-slate md:text-4xl">
                Honoring Dra. Isabel P. Mendoza
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                St. Anthony Dental Clinic proudly honors its founder, Dra.
                Isabel P. Mendoza, born on April 18, 1935, whose dedication and
                passion built the foundation of the care we continue to provide
                today.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-lilac/60 p-5">
                <h4 className="font-heading text-xl font-semibold text-slate">
                  Legacy
                </h4>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Through years of committed service, Dra. Mendoza touched
                  countless lives by creating healthy, confident smiles and
                  fostering a clinic grounded in compassion, trust, and
                  excellence.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-lilac/60 p-5">
                <h4 className="font-heading text-xl font-semibold text-slate">
                  Continuing care
                </h4>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Her vision was simple yet powerful: to make quality dental
                  care accessible while treating every patient like family.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white/75 p-5 md:p-6">
              <p className="text-sm leading-7 text-muted md:text-base md:leading-8">
                Her legacy lives on in every smile we serve. The values she
                instilled continue to guide our team in delivering the same
                level of care and dedication she always believed in.
              </p>
            </div>
          </Card>
        </div>

        <Card className="space-y-5 md:space-y-6">
          <h3 className="font-heading text-2xl font-semibold text-slate md:text-3xl">
            Our story
          </h3>
          <div className="grid gap-4 text-sm leading-7 text-muted md:grid-cols-2 md:text-base md:leading-8">
            <p>
              St. Anthony Dental Clinic began as a humble yet passionate vision
              of Dra. Isabel P. Mendoza, a dedicated dentist known for her
              gentle hands and compassionate heart. With years of experience and
              a strong commitment to community care, she built the clinic not
              just as a place for treatment, but as a space where patients felt
              comfort, trust, and genuine concern.
            </p>
            <p>
              Through the years, Dra. Mendoza&apos;s reputation grew. Families
              entrusted their smiles to her, and the clinic became a symbol of
              quality dental care and integrity. Her mission was simple yet
              powerful: to provide accessible, patient-centered dental services
              while treating everyone like family.
            </p>
            <p>
              As time passed and Dra. Mendoza prepared for a well-deserved
              retirement, she entrusted the clinic to a new generation of
              leadership under Dra. Cristina E. Sazon. With fresh energy, modern
              knowledge, and the same compassionate spirit, Dra. Sazon continued
              the legacy.
            </p>
            <p>
              Under her management, St. Anthony Dental Clinic embraced
              innovation while preserving its core values. New technologies were
              introduced, services expanded, and patient care became even more
              personalized. Despite these advancements, the clinic remained
              grounded in the warmth and dedication that Dra. Mendoza had
              instilled from the very beginning.
            </p>
            <p className="md:col-span-2">
              Today, St. Anthony Dental Clinic stands as a bridge between
              tradition and progress, a testament to two remarkable women whose
              shared passion continues to bring confident smiles to the
              community.
            </p>
          </div>
        </Card>

        <Card className="space-y-8 md:space-y-9">
          <div className="space-y-3">
            <h3 className="font-heading text-2xl font-semibold text-slate md:text-3xl">
              Mission
            </h3>
            <p className="text-sm leading-7 text-muted md:text-base md:leading-8">
              To provide high-quality, compassionate, and accessible dental care
              that promotes healthy, confident smiles. St. Anthony Dental Clinic
              is committed to delivering patient-centered services using modern
              techniques while treating every patient with respect, comfort, and
              care, just like family.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading text-2xl font-semibold text-slate md:text-3xl">
              Core Values
            </h3>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {coreValues.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-border bg-lilac/40 p-4"
                >
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-deep"
                    aria-hidden
                  />
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-slate">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Certifications are intentionally hidden until the content is ready for production. */}
        {/*
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={`cert-${index}`}>
              <div className="h-32 rounded-2xl bg-lavender/40" aria-hidden />
              <p className="mt-4 text-sm text-muted">
                Certification placeholder for clinic credentials and professional memberships.
              </p>
            </Card>
          ))}
        </div>
        */}
      </Container>
    </section>
  );
}
