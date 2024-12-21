import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  return (
    <main>
      <h1>Welcome to the Hashing Service</h1>
      <p>Frontend is ready with App Router!</p>
    </main>
  );
}
