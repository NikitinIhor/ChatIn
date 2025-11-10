import Joi from "joi";
import { emailRegexp } from "../constants/user.js";

export const userSignupSchema = Joi.object({
  username: Joi.string().min(2).max(50).trim().required(),

  email: Joi.string().pattern(emailRegexp).lowercase().required(),

  password: Joi.string().min(6).max(100).required(),

  avatar: Joi.string().uri().optional().allow(null, ""),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).lowercase().required(),

  password: Joi.string().min(6).max(100).required(),
});
