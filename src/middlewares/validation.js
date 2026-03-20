import { BadRequestException } from "../common/utils/response/index.js";

export const validateRequest = (schema , source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      throw BadRequestException({
        message: `Validation Error: ${messages}`,
      });
    }

    req[source] = value;
    next();
  };
};
