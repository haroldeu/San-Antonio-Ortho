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
            <h3 className="font-heading text-2xl font-semibold text-slate">
              Clinic information
            </h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>{clinicInfo.address}</p>
              <p>{clinicInfo.phone}</p>
              <p>{clinicInfo.landline}</p>
              <p>{clinicInfo.email}</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">
              Opening hours
            </h3>
            <div className="mt-4 space-y-2 text-sm text-muted">
              {clinicInfo.hours.map((item) => (
                <p key={item.label}>
                  {item.label}: {item.value}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">
              Map
            </h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Clinic location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.999852293455!2d122.28759526956006!3d13.958640699153449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a287de8c0de969%3A0x453aa4a238ee81cc!2sSt.%20Anthony%20Dental%20Clinic%20(Doc.%20Sazon)!5e0!3m2!1sen!2sph!4v1769750363327!5m2!1sen!2sph"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
