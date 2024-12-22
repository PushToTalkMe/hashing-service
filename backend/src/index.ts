import express from "express";
import {} from "@shared/schemas/hash.schema";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Сервер запущен!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
