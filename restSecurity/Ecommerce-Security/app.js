import express from "express";
import helmet from "helmet";
import { sessionMiddleware } from "./config/session.js";
import { sanitizeMiddleware } from "./utils/sanitize.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(sanitizeMiddleware);
app.use(sessionMiddleware);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

export default app;