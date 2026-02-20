import jwt from "jsonwebtoken";
import { env } from "../../config/index.js";
import { UnauthorizedException } from "../common/utils/response/index.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token || req.headers.authorization;

  if (!authHeader) {
    return UnauthorizedException({ message: "You are not authenticated!" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET_KEY, {
      issuer: "sara7a-app",
    });

    req.user = decoded;

    next();
  } catch (err) {
    return UnauthorizedException({ message: "Token is not valid or expired!" });
  }
};
