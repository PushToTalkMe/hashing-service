import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { Session } from "@/interfaces/session.interface";
import { ROUTES } from "@/utils/route";

export async function requireAuth() {
  const session = (await getServerSession(authOptions)) as Session;
  if (!session) {
    return redirect(ROUTES.SIGN_IN);
  }
  return session;
}
