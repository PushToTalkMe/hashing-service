import { NextResponse } from "next/server";
import { PrismaClient } from "@shared/prisma";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });
export async function GET(req: Request) {
  try {
    const prisma = new PrismaClient();
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Неизвестная ошибка" },
      { status: 400 }
    );
  }
}
