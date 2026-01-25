import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card } from "@/components/ui/Card";
import { clinicInfo } from "@/lib/constants";

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeading
            badge="Contact"
            title="Let us know how we can help"
            description="Reach out for questions, appointment requests, or care guidance."
          />
          <ContactForm />
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Clinic information</h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>{clinicInfo.address}</p>
              <p>{clinicInfo.phone}</p>
              <p>{clinicInfo.landline}</p>
              <p>{clinicInfo.email}</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Opening hours</h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              {clinicInfo.hours.map((item) => (
                <p key={item.label}>
                  {item.label}: {item.value}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Map</h3>
            <div className="mt-4 h-40 rounded-2xl bg-lavender/40" aria-hidden />
          </Card>
        </div>
      </Container>
    </section>
  );
}
