import express from "express";
import { Connection } from "./controller/empController.js";
import apiRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

Connection("mongodb://localhost:27017/employeeDB");

app.use("/", apiRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
