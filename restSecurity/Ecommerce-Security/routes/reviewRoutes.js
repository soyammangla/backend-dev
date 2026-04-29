import express from "express";
import { addReview } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, addReview);

export default router;