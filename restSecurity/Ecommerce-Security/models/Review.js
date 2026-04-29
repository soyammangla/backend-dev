import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: String,
  productId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Review", reviewSchema);