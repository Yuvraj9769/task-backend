import express from "express";
import cors from "cors";
import catererRoutes from "./routes/caterer.routes";
import { env } from "./config/env";

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.use("/api/v1", catererRoutes);

export default app;
