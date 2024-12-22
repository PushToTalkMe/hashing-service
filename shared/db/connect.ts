import { sequelize } from "./config";

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Успешное соединение с БД.");
  } catch (error) {
    console.error("Не удалось подключиться к БД:", error);
    process.exit(1);
  }
}

connectToDatabase();
