import Joi from "joi";

export const sendMessageSchema = Joi.object({
  content: Joi.string().trim().min(1).max(1000).required(),
  receiverId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required(),
});
