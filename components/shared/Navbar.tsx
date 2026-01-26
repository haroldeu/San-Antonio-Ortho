"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { basePath } from "@/lib/basePath";
import { cn } from "@/lib/cn";
import { navigationLinks } from "@/lib/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const body = document.body;
    const previousStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      touchAction: body.style.touchAction,
    };
    const scrollY = window.scrollY;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.touchAction = "none";
    }

    return () => {
      body.style.overflow = previousStyles.overflow;
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.touchAction = previousStyles.touchAction;

      if (isOpen) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);

    if (!href.includes("#")) return;

    const hash = href.startsWith("/#") ? href.slice(2) : href.replace("#", "");
    if (!hash) return;

    event.preventDefault();

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.hash = `#${hash}`;
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full border-b border-transparent transition duration-300",
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
            src={`${basePath}/images/logo.png`}
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
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white/80 p-2 text-slate transition hover:text-primary-deep md:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </Container>
      {mounted
        ? createPortal(
            <div
              className={cn(
                "fixed inset-0 z-[9999] md:hidden",
                isOpen ? "pointer-events-auto" : "pointer-events-none",
              )}
              aria-hidden={!isOpen}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
                  isOpen ? "opacity-100" : "opacity-0",
                )}
                onClick={() => setIsOpen(false)}
              />
              <aside
                className={cn(
                  "absolute right-0 top-0 h-full w-72 max-w-[85vw] border-l border-border bg-gradient-to-b from-white via-white to-lavender/40 p-6 shadow-xl transition-transform duration-300",
                  isOpen ? "translate-x-0" : "translate-x-full",
                )}
                aria-label="Mobile navigation"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`${basePath}/images/logo.png`}
                      alt="St. Anthony Dental Clinic"
                      width={36}
                      height={36}
                    />
                    <div>
                      <p className="font-heading text-sm font-semibold text-slate">
                        St. Anthony
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                        Dental Clinic
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-border p-2 text-slate transition hover:text-primary-deep"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <nav
                  className="mt-10 flex flex-col gap-4"
                  aria-label="Mobile main navigation"
                >
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-semibold text-slate transition-all duration-300 hover:text-primary-deep",
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0",
                      )}
                      style={{ transitionDelay: `${index * 60}ms` }}
                      onClick={(event) => handleNavClick(event, link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/book" onClick={() => setIsOpen(false)}>
                    <Button
                      size="sm"
                      className={cn(
                        "w-full transition-all duration-300",
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0",
                      )}
                      style={{ transitionDelay: `${navigationLinks.length * 60}ms` }}
                    >
                      Book Appointment
                    </Button>
                  </Link>
                </nav>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
