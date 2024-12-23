import AuditLogPage from "@/components/audit-log-page/audit-log-page";
import { requireAdmin } from "@/lib/admin-protect";

export default async function AuditLogPageServer() {
  await requireAdmin();

  return <AuditLogPage />;
}
