import AuditLogPage from "@/components/audit-log-page";
import { requireAdmin } from "@/lib/admin-protect";

export default async function AuditLogPageServer() {
  const session = await requireAdmin();

  return <AuditLogPage session={session} />;
}
