import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  return (
    <main>
      <h1>Добро пожаловать в Hashing Service!</h1>
      <p>Сервис по хешированию строки!</p>
      <p>
        Чтобы пользоваться сервисом, необходимо авторизоваться через Яндекс ID.
      </p>
    </main>
  );
}
