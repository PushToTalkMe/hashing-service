import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { authOptions } from "@/lib/auth";
import { Session } from "@/interfaces/session.interface";

export default async function HomePage() {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <main className={styles.main}>
      <h1>Добро пожаловать в Hashing Service!</h1>
      <p>Сервис по хешированию строки!</p>
      {!session && (
        <p>
          Чтобы пользоваться сервисом, необходимо авторизоваться через Яндекс
          ID.
        </p>
      )}
    </main>
  );
}
