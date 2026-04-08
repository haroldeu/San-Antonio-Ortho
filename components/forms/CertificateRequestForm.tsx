"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const initialState = {
  name: "",
  dateOfBirth: "",
  age: "",
  address: "",
};

type FormState = typeof initialState;

export function CertificateRequestForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formData.dateOfBirth)
      nextErrors.dateOfBirth = "Please enter your date of birth.";
    if (
      !formData.age.trim() ||
      Number.isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    ) {
      nextErrors.age = "Please enter a valid age.";
    }
    if (!formData.address.trim())
      nextErrors.address = "Please enter your address.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/certificate-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          dateOfBirth: formData.dateOfBirth,
          age: Number(formData.age),
          address: formData.address.trim(),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit your request.");
      }

      setSubmitted(true);
      setFormData(initialState);
      setErrors({});
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit your request.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Certificate request form"
      >
        <div>
          <label
            className="text-sm font-medium text-slate"
            htmlFor="certificate-name"
          >
            Full name
          </label>
          <Input
            id="certificate-name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="e.g., Maria Santos"
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-primary-deep">{errors.name}</p>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              className="text-sm font-medium text-slate"
              htmlFor="certificate-dob"
            >
              Date of birth
            </label>
            <Input
              id="certificate-dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(event) =>
                handleChange("dateOfBirth", event.target.value)
              }
              aria-invalid={!!errors.dateOfBirth}
            />
            {errors.dateOfBirth ? (
              <p className="mt-1 text-xs text-primary-deep">
                {errors.dateOfBirth}
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-medium text-slate"
              htmlFor="certificate-age"
            >
              Age
            </label>
            <Input
              id="certificate-age"
              type="number"
              min="1"
              step="1"
              value={formData.age}
              onChange={(event) => handleChange("age", event.target.value)}
              placeholder="e.g., 32"
              aria-invalid={!!errors.age}
            />
            {errors.age ? (
              <p className="mt-1 text-xs text-primary-deep">{errors.age}</p>
            ) : null}
          </div>
        </div>
        <div>
          <label
            className="text-sm font-medium text-slate"
            htmlFor="certificate-address"
          >
            Address
          </label>
          <Textarea
            id="certificate-address"
            rows={4}
            value={formData.address}
            onChange={(event) => handleChange("address", event.target.value)}
            placeholder="Street, city, province"
            aria-invalid={!!errors.address}
          />
          {errors.address ? (
            <p className="mt-1 text-xs text-primary-deep">{errors.address}</p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request certificate"}
        </Button>
        {submitted ? (
          <p
            className="text-sm text-primary-deep"
            role="status"
            aria-live="polite"
          >
            Thank you. Your certificate request has been sent.
          </p>
        ) : null}
        {submitError ? (
          <p className="text-sm text-primary-deep" role="alert">
            {submitError}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
