"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  createCertificatePdf,
  type CertificateAdminFields,
} from "@/lib/certificatePdf";

type CertificateRequest = {
  id: string;
  created_at: string;
  name: string;
  date_of_birth: string;
  age: number;
  address: string;
  status: string;
  pdf_url: string | null;
  admin_fields: unknown;
};

type AdminCertificateEditFormProps = {
  request: CertificateRequest;
  accessToken: string;
};

type FormState = CertificateAdminFields;

const defaultState: FormState = {
  adminField1: false,
  adminField2: false,
  adminField3: false,
  adminField4: false,
  adminField5: null,
  adminField6: false,
  adminField7: "",
  adminField8: false,
  adminField9: "",
  adminField10: "",
  selectedSpecialNumbers: [],
};

const topToothNumbers = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
];
const bottomToothNumbers = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

function ToothChartRow({
  numbers,
  selected,
  onToggle,
}: {
  numbers: number[];
  selected: number[];
  onToggle: (number: number) => void;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
    >
      {numbers.map((number) => (
        <label
          key={number}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white/70 px-2 py-2 text-xs font-medium text-slate"
        >
          <span>{number}</span>
          <input
            type="checkbox"
            checked={selected.includes(number)}
            onChange={() => onToggle(number)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
        </label>
      ))}
    </div>
  );
}

function normalizeFields(input: unknown): FormState {
  if (!input || typeof input !== "object") return defaultState;

  const value = input as Partial<FormState>;
  const selectedSpecialNumbers = Array.isArray(value.selectedSpecialNumbers)
    ? value.selectedSpecialNumbers
        .map((item) => Number(item))
        .filter((item) => Number.isInteger(item) && item >= 11 && item <= 48)
    : [];

  return {
    adminField1: Boolean(value.adminField1),
    adminField2: Boolean(value.adminField2),
    adminField3: Boolean(value.adminField3),
    adminField4: Boolean(value.adminField4),
    adminField5:
      typeof value.adminField5 === "number" &&
      Number.isInteger(value.adminField5)
        ? value.adminField5
        : null,
    adminField6: Boolean(value.adminField6),
    adminField7: typeof value.adminField7 === "string" ? value.adminField7 : "",
    adminField8: Boolean(value.adminField8),
    adminField9: typeof value.adminField9 === "string" ? value.adminField9 : "",
    adminField10:
      typeof value.adminField10 === "string" ? value.adminField10 : "",
    selectedSpecialNumbers,
  };
}

function filenameForRequest(name: string) {
  return `certificate-${
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "request"
  }.pdf`;
}

export function AdminCertificateEditForm({
  request,
  accessToken,
}: AdminCertificateEditFormProps) {
  const [formData, setFormData] = useState<FormState>(() =>
    normalizeFields(request.admin_fields),
  );
  const [status, setStatus] = useState(request.status);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const hasSelectedTeeth = formData.selectedSpecialNumbers.length > 0;
  const effectiveAdminField2 = formData.adminField2 || hasSelectedTeeth;

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const toggleSpecialNumber = (number: number) => {
    setFormData((previous) => {
      const hasNumber = previous.selectedSpecialNumbers.includes(number);
      const selectedSpecialNumbers = hasNumber
        ? previous.selectedSpecialNumbers.filter((value) => value !== number)
        : [...previous.selectedSpecialNumbers, number].sort((a, b) => a - b);

      return {
        ...previous,
        adminField2:
          selectedSpecialNumbers.length > 0 ? true : previous.adminField2,
        selectedSpecialNumbers,
      };
    });
  };

  const saveRequest = async (nextStatus: string, shouldDownload = false) => {
    setIsSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/certificate-requests?id=${request.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            status: nextStatus,
            adminFields: {
              ...formData,
              adminField2: effectiveAdminField2,
            },
            pdfUrl: null,
          }),
        },
      );

      const result = (await response.json()) as {
        error?: string;
        request?: CertificateRequest;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to save request.");
      }

      setStatus(result.request?.status ?? nextStatus);

      if (shouldDownload) {
        const pdfBytes = await createCertificatePdf({
          request: {
            name: request.name,
            date_of_birth: request.date_of_birth,
            age: request.age,
            address: request.address,
          },
          fields: formData,
        });
        const pdfBuffer = pdfBytes.buffer.slice(
          pdfBytes.byteOffset,
          pdfBytes.byteOffset + pdfBytes.byteLength,
        ) as ArrayBuffer;
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filenameForRequest(request.name);
        anchor.click();
        URL.revokeObjectURL(url);
      }

      setMessage(
        shouldDownload
          ? "Saved and downloaded the certificate PDF."
          : "Draft saved successfully.",
      );
    } catch (err) {
      const nextMessage =
        err instanceof Error ? err.message : "Unable to save request.";
      setError(nextMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Request details
          </p>
          <h2 className="font-heading text-2xl font-semibold text-slate">
            {request.name}
          </h2>
          <p className="text-sm text-muted">Status: {status}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Date of birth
            </p>
            <p className="text-sm text-slate">{request.date_of_birth}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Age</p>
            <p className="text-sm text-slate">{request.age}</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Address
          </p>
          <p className="text-sm text-slate">{request.address}</p>
        </div>
      </Card>

      <Card className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Admin fields
          </p>
          <h3 className="font-heading text-2xl font-semibold text-slate">
            Fill out the certificate
          </h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-slate">
            <input
              type="checkbox"
              checked={formData.adminField1}
              onChange={(event) =>
                updateField("adminField1", event.target.checked)
              }
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>Oral Prophylaxis</span>
          </label>

          <div className="rounded-2xl border border-border bg-white/70 px-4 py-4 text-sm text-slate space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={effectiveAdminField2}
                readOnly
                onChange={(event) =>
                  updateField("adminField2", event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span className="font-medium">
                Permanent Restoration (FILLINGS) on the following teeth:
              </span>
            </label>

            <div className="overflow-x-auto pb-1">
              <div className="min-w-[920px] space-y-3">
                <ToothChartRow
                  numbers={topToothNumbers}
                  selected={formData.selectedSpecialNumbers}
                  onToggle={toggleSpecialNumber}
                />
                <div className="flex items-center gap-3 px-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                  <span>R</span>
                  <div className="h-px flex-1 bg-border" />
                  <span>L</span>
                </div>
                <ToothChartRow
                  numbers={bottomToothNumbers}
                  selected={formData.selectedSpecialNumbers}
                  onToggle={toggleSpecialNumber}
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-slate">
            <input
              type="checkbox"
              checked={formData.adminField3}
              onChange={(event) =>
                updateField("adminField3", event.target.checked)
              }
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>Gingival/ Periodontal Therapy</span>
          </label>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-slate">
              <input
                type="checkbox"
                checked={formData.adminField4}
                onChange={(event) =>
                  updateField("adminField4", event.target.checked)
                }
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Extractions of Teeth NO.</span>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate">Teeth No.</span>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.adminField5 ?? ""}
                onChange={(event) =>
                  updateField(
                    "adminField5",
                    event.target.value ? Number(event.target.value) : null,
                  )
                }
                placeholder="Teeth No."
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-slate">
              <input
                type="checkbox"
                checked={formData.adminField6}
                onChange={(event) =>
                  updateField("adminField6", event.target.checked)
                }
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Others (Please Specify) :</span>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate">
                Please Specify
              </span>
              <Input
                value={formData.adminField7}
                onChange={(event) =>
                  updateField("adminField7", event.target.value)
                }
                placeholder="Please Specify"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-slate">
              <input
                type="checkbox"
                checked={formData.adminField8}
                onChange={(event) =>
                  updateField("adminField8", event.target.checked)
                }
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Others (Please Specify) :</span>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate">
                Please Specify
              </span>
              <Input
                value={formData.adminField9}
                onChange={(event) =>
                  updateField("adminField9", event.target.value)
                }
                placeholder="Please Specify"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate">Remarks</span>
            <Textarea
              value={formData.adminField10}
              onChange={(event) =>
                updateField("adminField10", event.target.value)
              }
              placeholder="Remarks"
              rows={4}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => void saveRequest("in-progress")}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save draft"}
          </Button>
          <Button
            type="button"
            onClick={() => void saveRequest("completed", true)}
            disabled={isSaving}
          >
            {isSaving ? "Processing..." : "Download PDF"}
          </Button>
        </div>

        {message ? (
          <p className="text-sm text-primary-deep">{message}</p>
        ) : null}
        {error ? <p className="text-sm text-primary-deep">{error}</p> : null}
      </Card>
    </div>
  );
}
