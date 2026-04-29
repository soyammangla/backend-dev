import express from "express";
import { logger } from "./middlewares/logger.js";
import { sanitizeMiddleware } from "./middlewares/sanitize.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(express.json());
app.use(sanitizeMiddleware);
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

export default app;