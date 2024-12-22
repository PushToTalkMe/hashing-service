import express from "express";
import { hashRouter } from "./routes/hash.routes";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(hashRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
