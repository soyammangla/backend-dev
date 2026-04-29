import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // soft delete filter applies automatically
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const softDeletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.json({ message: "Post soft deleted", post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};