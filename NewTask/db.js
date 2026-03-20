import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/backenddb");
  } catch (error) {
    console.log("connection failed", error);
  }
};
export default connectDB;
