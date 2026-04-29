import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    lastLogin: Date,
    lastLogout: Date,
    lastActive: Date
});

// Automatically update lastActive
userSchema.pre("save", function (next) {
    this.lastActive = new Date();
    next();
});

export const User = mongoose.model("User", userSchema);