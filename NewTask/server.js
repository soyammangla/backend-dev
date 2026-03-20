import connectDB from "./db.js";
import user from "./userSchema.js";

connectDB();

const createUser = async (name, email, password, role) => {
  try {
    const newUser = await user.create({
      Name: name,
      Email: email,
      Password: password,
      Role: role,
    });
    console.log("User created successfully:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
createUser("soyam", "soyammangla115@gmail.com", "soyam123", "admin");
createUser("Priyanshu", "priyanshu@gmail.com", "priyanshu123", "admin");
createUser("Rohit", "rohit@gmail.com", "rohit123", "user");

const readuser = async () => {
  try {
    const users = await user.find();
    console.log("Users retrieved successfully:", users);
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
};
readuser();

const updateUser = async (email, newName) => {
  try {
    const updatedUser = await user.findOneAndUpdate(
      { Email: email },
      { Name: newName },
      { new: true },
    );
    console.log("User updated successfully:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
updateUser("soyammangla115@gmail.com", "Soyam Mangla");

const deleteUser = async (email) => {
  try {
    const deletedUser = await user.findOneAndDelete({ Email: email });
    console.log("User deleted successfully:", deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
deleteUser("soyammangla115@gmail.com");
