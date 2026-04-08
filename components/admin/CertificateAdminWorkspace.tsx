"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AdminCertificateEditForm } from "@/components/forms/AdminCertificateEditForm";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { useAdminAuth } from "@/lib/useAdminAuth";

type CertificateQueueRequest = {
  id: string;
  created_at: string;
  name: string;
  date_of_birth: string;
  age: number;
  address: string;
  status: string;
  pdf_url: string | null;
};

type CertificateDetailRequest = CertificateQueueRequest & {
  admin_fields: unknown;
};

export function CertificateAdminWorkspace() {
  const { isAdmin, loading: authLoading, error: authError, signIn, signOut, accessToken } = useAdminAuth();
  const [requests, setRequests] = useState<CertificateQueueRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<CertificateDetailRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/certificate-requests", {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });

      const result = (await response.json()) as {
        error?: string;
        requests?: CertificateQueueRequest[];
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to load requests.");
      }

      setRequests(result.requests ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load requests.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const loadSelectedRequest = useCallback(
    async (requestId = selectedId) => {
      if (!requestId) {
        setSelectedRequest(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/certificate-requests?id=${requestId}`, {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
        });
        const result = (await response.json()) as {
          error?: string;
          request?: CertificateDetailRequest;
        };

        if (!response.ok) {
          throw new Error(result.error ?? "Unable to load request.");
        }

        setSelectedRequest(result.request ?? null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load request.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [accessToken, selectedId],
  );

  useEffect(() => {
    if (isAdmin) {
      void loadRequests();
    }
  }, [isAdmin, loadRequests]);

  useEffect(() => {
    if (selectedId && isAdmin) {
      void loadSelectedRequest(selectedId);
    }
  }, [selectedId, isAdmin, loadSelectedRequest]);

  // Show login form if not authenticated
  if (!isAdmin) {
    return <AdminLoginForm onSubmit={signIn} isLoading={authLoading} error={authError} />;
  }

  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-6">
        <Card className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Admin
            </p>
            <h1 className="font-heading text-3xl font-semibold text-slate">
              Certificate requests
            </h1>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void signOut()}
            disabled={authLoading}
          >
            {authLoading ? "Signing out..." : "Sign Out"}
          </Button>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold text-slate">
              Queue
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted">{requests.length} request(s)</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => void loadRequests()}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">DOB</th>
                  <th className="py-3 pr-4">Age</th>
                  <th className="py-3 pr-4">Address</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="py-3 pr-4 font-medium text-slate">
                      <Link
                        href={`/admin/certificates?id=${request.id}`}
                        className="text-primary-deep transition hover:underline"
                      >
                        {request.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {request.date_of_birth}
                    </td>
                    <td className="py-3 pr-4 text-muted">{request.age}</td>
                    <td className="py-3 pr-4 text-muted">{request.address}</td>
                    <td className="py-3 pr-4 text-muted">{request.status}</td>
                  </tr>
                ))}
                {requests.length === 0 ? (
                  <tr>
                    <td className="py-6 text-muted" colSpan={5}>
                      No requests yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </Card>

        {selectedId ? (
          <Card className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Selected request
              </p>
              <h2 className="font-heading text-2xl font-semibold text-slate">
                Certificate detail
              </h2>
            </div>
            {selectedRequest ? (
              <AdminCertificateEditForm
                request={selectedRequest}
                accessToken={accessToken ?? ""}
              />
            ) : (
              <p className="text-sm text-muted">
                Click on a request name to load its details.
              </p>
            )}
          </Card>
        ) : null}
      </Container>
    </section>
  );
}
