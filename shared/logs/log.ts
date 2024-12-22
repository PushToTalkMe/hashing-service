import { PrismaClient } from "shared/prisma";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });
export async function log(
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
