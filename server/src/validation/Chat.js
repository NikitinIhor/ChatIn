import Joi from "joi";

export const chatAddSchema = Joi.object({
  receiver: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .messages({
      "string.pattern.base": "Receiver must be a valid ObjectId",
    }),

  chatRoom: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .messages({
      "string.pattern.base": "ChatRoom must be a valid ObjectId",
    }),

  message: Joi.string().trim().required().messages({
    "string.empty": "Message cannot be empty",
  }),

  image: Joi.string().uri().allow(null, ""),
  file: Joi.string().uri().allow(null, ""),
  isRead: Joi.boolean().default(false),
});
