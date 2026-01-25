"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { navigationLinks } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition duration-300",
        isScrolled
          ? "border-border bg-white/80 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="St. Anthony Dental Clinic"
        >
          <Image
            src="/images/logo.png"
            alt="St. Anthony Dental Clinic"
            width={44}
            height={44}
          />
          <div className="hidden sm:block">
            <p className="font-heading text-lg font-semibold text-slate">
              St. Anthony
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Dental Clinic
            </p>
          </div>
        </Link>
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-slate transition hover:text-primary-deep",
                pathname === link.href ? "text-primary-deep" : "text-slate",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden sm:inline-flex">
            <Button size="sm">Book Appointment</Button>
          </Link>
          <Link href="/book" className="sm:hidden">
            <Button size="sm">Book</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
