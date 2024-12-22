"use client";
import { Session } from "@/interfaces/session.interface";
import { ROLES } from "@/utils/constants";
import { ROUTES } from "@/utils/route";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} href={ROUTES.APP}>
            Домашняя страница
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href={ROUTES.HASH}>
            Хешировать строку
          </Link>
        </li>
        {session ? (
          <>
            {session.user.role === ROLES.ADMIN && (
              <li className={styles.li}>
                <Link className={styles.link} href={ROUTES.ADMIN}>
                  Аудит Лог
                </Link>
              </li>
            )}
            <li className={styles.li}>
              <form
                className={styles.form}
                action={ROUTES.SIGN_OUT}
                method="post"
              >
                <button className={styles.button} type="submit">
                  Выйти
                </button>
              </form>
            </li>
          </>
        ) : (
          <li className={styles.li}>
            <form className={styles.form} action={ROUTES.SIGN_IN} method="post">
              <button className={styles.button} type="submit">
                Войти
              </button>
            </form>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
