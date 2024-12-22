import { Request, Response } from "express";
import { HashRequest, hashRequestSchema } from "shared/schemas/hash.schema";
import { hashing } from "../utils/hashing";

export async function hashPostController(
  req: Request,
  res: Response
): Promise<any> {
  const { data, algorithm }: HashRequest = hashRequestSchema.parse(
    req.body
  ) as HashRequest;
  const hash = hashing({ algorithm, data });
  res.json({ hash });
}
