import { Router } from "express";
import { signupController } from "../controllers/authController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import userSchema from "../validation/User.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(userSchema),
  ctrlWrapper(signupController)
);

export default authRouter;
