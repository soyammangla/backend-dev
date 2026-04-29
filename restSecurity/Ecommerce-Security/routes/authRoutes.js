import express from "express";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",loginLimiter,login);

export default router;