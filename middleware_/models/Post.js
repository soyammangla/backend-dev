import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

// Hide deleted documents automatically
postSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

export const Post = mongoose.model("Post", postSchema);