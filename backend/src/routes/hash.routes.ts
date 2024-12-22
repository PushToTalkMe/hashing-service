import { Router } from "express";
import { hashPostController } from "../controllers/hash.controller";

const hashRouter = Router();

hashRouter.post("/hash", hashPostController);

export { hashRouter };
