import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const userRouter = Router();

userRouter.post("/sync", requireAuth(), syncUser);

export default userRouter;
