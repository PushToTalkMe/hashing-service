import { Request, Response } from "express";
import { hashRequestSchema } from "shared/schemas/hash.schema";
import { hashing } from "../utils/hashing";
import { log } from "shared/logs/log";

export async function hashPostController(
  req: Request,
  res: Response
): Promise<any> {
  const { data, algorithm } = hashRequestSchema.parse(req.body);
  const hash = hashing({ algorithm, data });
  await log(
    null,
    "hashing",
    "success",
    JSON.stringify({
      data,
      algorithm,
      hash,
    })
  );
  res.json({ hash });
}
