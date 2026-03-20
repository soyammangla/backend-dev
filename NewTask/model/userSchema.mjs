import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
console.log("User schema defined successfully", userSchema);
export default mongoose.model("User", userSchema);
