import crypto from "crypto";
import { HashRequest } from "shared/schemas/hash.schema";

export const hashing = ({ algorithm, data }: HashRequest) => {
  return crypto.createHash(algorithm).update(data).digest("hex");
};
