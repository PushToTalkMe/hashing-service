import { redirect } from "next/navigation";
import { requireAuth } from "./auth-protect";

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") {
    return redirect("/");
  }
  return session;
}
