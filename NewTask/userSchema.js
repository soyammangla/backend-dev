import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: [3, "Nmae must contain at least 3 characters"],
    maxlength: [25, "Name must contain at most 25 characters"],
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: [6, "Password must contain at least 6 characters"],
  },
  Role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const user = mongoose.model("user", userSchema);
export default user;
