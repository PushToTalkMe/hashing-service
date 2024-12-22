"use client";
import { Session } from "@/interfaces/session.interface";
import { ROLES } from "@/utils/constants";
import { ROUTES } from "@/utils/route";
import Link from "next/link";

const Navbar = ({ session }: { session: Session }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={ROUTES.APP}>Домашняя страница</Link>
        </li>
        <li>
          <Link href={ROUTES.HASH}>Хешировать строку</Link>
        </li>
        {session ? (
          <>
            {session.user.role === ROLES.ADMIN && (
              <li>
                <Link href={ROUTES.ADMIN}>Аудит Лог</Link>
              </li>
            )}
            <li>
              <form action={ROUTES.SIGN_OUT} method="post">
                <button type="submit">Выйти</button>
              </form>
            </li>
          </>
        ) : (
          <li>
            <form action={ROUTES.SIGN_IN} method="post">
              <button type="submit">Войти</button>
            </form>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
