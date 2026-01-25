import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/forms/BookingForm";
import { Card } from "@/components/ui/Card";

export default function BookPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeading
            badge="Book"
            title="Request your appointment"
            description="Share a few details and our team will confirm your visit quickly."
          />
          <BookingForm />
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">What happens next</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-muted">
              <li>We review your request and preferred schedule.</li>
              <li>Our team calls or emails to confirm your slot.</li>
              <li>Enjoy a calm and confident dental visit.</li>
            </ol>
          </Card>
          <Card>
            <h3 className="font-heading text-2xl font-semibold text-slate">Preparing for your visit</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Bring any existing dental records or X-rays.</li>
              <li>Arrive 10 minutes early for paperwork.</li>
              <li>Let us know about medical conditions or sensitivities.</li>
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}
