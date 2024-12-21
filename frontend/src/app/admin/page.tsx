import { requireAdmin } from "@/lib/admin-protect";

export default async function AuditLogPage() {
  await requireAdmin();

  return (
    <div>
      <h1>Аудит логов</h1>
    </div>
  );
}
