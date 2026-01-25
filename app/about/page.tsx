import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-12">
        <SectionHeading
          badge="About"
          title="A clinic built on calm, care, and clinical excellence"
          description="St. Anthony Dental Clinic is committed to modern dentistry delivered with warmth, clarity, and respect."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Our story</h3>
            <p className="mt-3 text-sm text-muted">
              Inspired by community care, we built a clinic that feels premium yet welcoming. Our team
              focuses on preventive education and confident outcomes for every patient.
            </p>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Mission & values</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Patient-first communication and transparency.</li>
              <li>Modern techniques and premium materials.</li>
              <li>Gentle care for families across all ages.</li>
            </ul>
          </Card>
        </div>
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
      </Container>
    </section>
  );
}
