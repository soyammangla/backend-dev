import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const { comment, productId } = req.body;

  const review = new Review({ comment, productId });
  await review.save();

  res.json(review);
};