import Navbar from "@/components/navbar/navbar";
import { Session } from "@/interfaces/session.interface";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../styles/global.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session;
  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
