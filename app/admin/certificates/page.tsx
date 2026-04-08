import { Suspense } from "react";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CertificateAdminWorkspace } from "@/components/admin/CertificateAdminWorkspace";

function AdminLoadingState() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Card>
          <p className="text-sm text-muted">Loading certificate workspace...</p>
        </Card>
      </Container>
    </section>
  );
}

export default function AdminCertificatesPage() {
  return (
    <Suspense fallback={<AdminLoadingState />}>
      <CertificateAdminWorkspace />
    </Suspense>
  );
}
