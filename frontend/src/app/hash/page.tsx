import HashPageForm from "@/components/hash-page-form/hash-page-form";
import { requireAuth } from "@/lib/auth-protect";

export default async function HashPageServer() {
  const session = await requireAuth();

  return <HashPageForm session={session} />;
}
