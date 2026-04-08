import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificateRequestForm } from "@/components/forms/CertificateRequestForm";

export default function CertificatePage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionHeading
            badge="Certificate"
            title="Request a certificate"
            description="Submit your details and our team will prepare the certificate for review."
          />
          <CertificateRequestForm />
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">
              What we need
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Your full name</li>
              <li>Your date of birth</li>
              <li>Your age</li>
              <li>Your address</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">
              What happens next
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-muted">
              <li>You submit the request.</li>
              <li>We email the request to our team.</li>
              <li>The admin prepares the rest of the certificate.</li>
            </ol>
          </Card>
        </div>
      </Container>
    </section>
  );
}
