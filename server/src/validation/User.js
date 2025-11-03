import Joi from "joi";
import { emailRegexp } from "../../constants/user.js";

export const userSchema = Joi.object({
  username: Joi.string().min(2).max(50).trim().required(),

  email: Joi.string().pattern(emailRegexp).lowercase().required(),

  password: Joi.string().min(6).max(100).required(),
});
