import { Router } from "express";
import {
  signinController,
  signupController,
} from "../controllers/authController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../validation/User.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  ctrlWrapper(signupController)
);

authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  ctrlWrapper(signinController)
);

export default authRouter;
