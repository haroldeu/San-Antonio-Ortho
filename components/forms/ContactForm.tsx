"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabaseClient";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type FormState = typeof initialState;

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.email.includes("@")) nextErrors.email = "Please enter a valid email.";
    if (!formData.message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError(null);
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() ? formData.phone.trim() : null,
        message: formData.message.trim(),
      });

      if (error) {
        throw new Error("Unable to submit your message.");
      }

      setSubmitted(true);
      setFormData(initialState);
      setErrors({});
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to submit your message.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="contact-name">
            Full name
          </label>
          <Input
            id="contact-name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="e.g., Maria Santos"
            aria-invalid={!!errors.name}
          />
          {errors.name ? <p className="mt-1 text-xs text-primary-deep">{errors.name}</p> : null}
        </div>
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="contact-email">
            Email address
          </label>
          <Input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
          />
          {errors.email ? <p className="mt-1 text-xs text-primary-deep">{errors.email}</p> : null}
        </div>
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="contact-phone">
            Phone number
          </label>
          <Input
            id="contact-phone"
            value={formData.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            placeholder="+63"
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? <p className="mt-1 text-xs text-primary-deep">{errors.phone}</p> : null}
        </div>
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="contact-message">
            Message
          </label>
          <Textarea
            id="contact-message"
            rows={4}
            value={formData.message}
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder="Tell us how we can help"
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-primary-deep">{errors.message}</p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
        {submitError ? (
          <p className="text-sm text-primary-deep" role="status" aria-live="polite">
            {submitError}
          </p>
        ) : null}
        {submitted ? (
          <p className="text-sm text-primary-deep" role="status" aria-live="polite">
            Thank you! We will get back to you within 24 hours.
          </p>
        ) : null}
      </form>
    </Card>
  );
}
