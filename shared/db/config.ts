import { AuditLog } from "../models/audit-log.model";
import { Sequelize } from "sequelize-typescript";

const DB = process.env.DB || "db";
const DB_DIALECT = "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = +(process.env.DB_PORT as string) || 5435;
const DB_USERNAME = process.env.DB_USERNAME || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";

const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB,
  logging: false,
  models: [AuditLog],
});

export { sequelize };
