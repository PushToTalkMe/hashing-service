import { Role, Session } from "@/interfaces/session.interface";
import { ROLES } from "@/utils/constants";
import { logAuth } from "@shared/logs/log-auth";
import { NextAuthOptions } from "next-auth";
import YandexProvider, { YandexProfile } from "next-auth/providers/yandex";

export const authOptions: NextAuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "login:email login:info",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const yandexProfile = profile as YandexProfile;

        token.role =
          yandexProfile.default_email === process.env.EMAIL_ADMIN
            ? ROLES.ADMIN
            : ROLES.USER;
      }
      return token;
    },
    async session({ session, token }) {
      const sessionApp = session as Session;
      const role = token.role as Role;

      sessionApp.user = {
        ...session.user,
        role,
      };
      return sessionApp;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (user && account) {
        await logAuth(
          user.id,
          "login",
          "success",
          JSON.stringify({
            email: user.email,
            provider: account.provider,
          })
        );
      } else {
        await logAuth(null, "login", "failed");
      }
    },
    async signOut({ token }) {
      if (token.sub) {
        await logAuth(
          token.sub,
          "logout",
          "success",
          JSON.stringify({
            email: token.email,
          })
        );
      } else {
        await logAuth(null, "logout", "failed");
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
