import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "USER"
  }
});

export default mongoose.model("User", userSchema);