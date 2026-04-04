import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./routes/healthRoutes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/health", healthRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Aquaveda API is running" });
});

app.use(notFound);
app.use(errorHandler);

export default app;