import user from "../model/userSchema.mjs";
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newuser = await user.Create({
      name,
      email,
      password,
      role,
    });
    res.status(200).json({
      message: "user is created",
      newuser,
    });
  } catch (error) {
    res.status(500).json({
      message: "an error occured",
    });
  }
};
