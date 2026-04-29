import Product from "../models/Product.js";

export const searchProducts = async (req, res) => {
  const q = req.query.q;

  const products = await Product.find({
    name: { $regex: q, $options: "i" },
    price: { $gte: 0 }
  });

  res.json(products);
};