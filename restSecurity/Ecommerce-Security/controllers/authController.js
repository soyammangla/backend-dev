import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  req.session.user = {
    id: user._id,
    role: user.role
  };

  res.json({ message: "Logged in" });
};