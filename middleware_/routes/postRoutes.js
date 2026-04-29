import express from "express";
import {
    createPost,
    getPosts,
    softDeletePost
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:id", softDeletePost);

export default router;