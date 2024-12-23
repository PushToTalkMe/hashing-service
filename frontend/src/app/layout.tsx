import Navbar from "@/components/navbar/navbar";
import { Session } from "@/interfaces/session.interface";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../styles/globals.css";
import Theme from "@/components/theme/theme";

export const metadata = {
  title: "Хеширование строк",
  description: "Приложение для хеширования строк с заданным алгоритмом.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <html lang="en">
      <body>
        <Theme />
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
