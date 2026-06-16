import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT ?? 5000,
  mongoUri: process.env.MONGODB_URL,
  corsOrigin: process.env.CORS_ORIGIN,
  nodeEnv: process.env.NODE_ENV ?? "development",
  dbName: process.env.DB_NAME,
};
