import { ALGORITHMS } from "@shared/algorithms";
import { z } from "zod";

export const hashRequestSchema = z.object({
  data: z.string().min(1, "Строка не может быть пустой"),
  algorithm: z.enum(ALGORITHMS, {
    required_error: "Неизвестный алгоритм",
  }),
});

export type HashRequest = z.infer<typeof hashRequestSchema>;
