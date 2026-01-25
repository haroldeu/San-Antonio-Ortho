"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { services } from "@/data/services";

const initialState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: ""
};

type BookingState = typeof initialState;

type BookingStatus = "idle" | "loading" | "success" | "error";

export function BookingForm() {
  const [formData, setFormData] = useState<BookingState>(initialState);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const serviceOptions = useMemo(() => services.map((service) => service.title), []);

  const handleChange = (field: keyof BookingState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setErrorMessage("Please complete all required fields before submitting.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    if (!validate()) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormData(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Booking form">
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="booking-name">
            Full name *
          </label>
          <Input
            id="booking-name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="e.g., Maria Santos"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate" htmlFor="booking-email">
              Email address *
            </label>
            <Input
              id="booking-email"
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate" htmlFor="booking-phone">
              Phone number *
            </label>
            <Input
              id="booking-phone"
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              placeholder="+63"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="booking-service">
            Service *
          </label>
          <select
            id="booking-service"
            value={formData.service}
            onChange={(event) => handleChange("service", event.target.value)}
            className="w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm text-slate shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate" htmlFor="booking-date">
              Preferred date
            </label>
            <Input
              id="booking-date"
              type="date"
              value={formData.date}
              onChange={(event) => handleChange("date", event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate" htmlFor="booking-time">
              Preferred time
            </label>
            <Input
              id="booking-time"
              type="time"
              value={formData.time}
              onChange={(event) => handleChange("time", event.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate" htmlFor="booking-notes">
            Notes
          </label>
          <Textarea
            id="booking-notes"
            rows={4}
            value={formData.notes}
            onChange={(event) => handleChange("notes", event.target.value)}
            placeholder="Tell us anything we should know before your visit."
          />
        </div>
        <Button type="submit" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Request appointment"}
        </Button>
        {status === "success" ? (
          <p className="text-sm text-primary-deep" role="status" aria-live="polite">
            Request received! We will confirm your appointment shortly.
          </p>
        ) : null}
        {status === "error" && errorMessage ? (
          <p className="text-sm text-primary-deep" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
