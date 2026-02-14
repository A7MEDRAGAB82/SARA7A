import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const mongoURL = process.env.DATABASE_URI;
const mood = process.env.MOOD;
const port = process.env.PORT;
const saltRounds = process.env.SALT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ENC_KEY = process.env.ENC_KEY || "defaultKey";

export const env = {
  port,
  mongoURL,
  mood,
  saltRounds,
  JWT_SECRET_KEY,
  ENC_KEY,
};
