import { PrismaClient } from "@shared/prisma";

export async function logAuth(
  userId: string | null,
  action: string,
  status: string,
  additionalData?: string | null
) {
  const prisma = new PrismaClient();

  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        status,
        additionalData,
      },
    });
  } catch (error) {
    console.log(`Ошибка записи лога ${action}:`, error);
  }
}
