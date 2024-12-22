import { NextResponse } from "next/server";
import { PrismaClient } from "@shared/prisma";

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const { userId, action, status, additionalData } = await req.json();
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        status,
        additionalData: additionalData,
      },
    });
    return NextResponse.json(
      { message: "Успешное логирование" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Неизвестная ошибка" },
      { status: 400 }
    );
  }
}
