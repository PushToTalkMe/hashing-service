import { DefaultSession } from "next-auth";

export type Role = "user" | "admin";

export interface Session extends DefaultSession {
  user: DefaultSession["user"] & {
    role: Role;
  };
}
