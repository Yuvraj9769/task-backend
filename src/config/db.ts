import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  try {

    if(!env?.mongoUri || !env?.dbName) {
      throw new Error("MongoDB URI or database name is not defined in environment variables");
    }

    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
  
}
