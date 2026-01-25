import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { clinicInfo, navigationLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/70">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-slate">{clinicInfo.name}</h3>
          <p className="mt-3 text-sm text-muted">
            Premium dental care that feels warm, calm, and confidently professional.
          </p>
          <p className="mt-4 text-sm text-muted">{clinicInfo.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-primary-deep" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:text-primary-deep" href="/book">
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate">
            <li>{clinicInfo.phone}</li>
            <li>{clinicInfo.landline}</li>
            <li>{clinicInfo.email}</li>
          </ul>
          <div className="mt-4 text-xs text-muted">
            {clinicInfo.hours.map((item) => (
              <p key={item.label}>
                {item.label}: {item.value}
              </p>
            ))}
          </div>
        </div>
      </Container>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} St. Anthony Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
}
