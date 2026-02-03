// import express from "express";
// import logfun from "./middleware.js";
// const app = express();

// app.use(express.json());
// // req -> middleware -> res
// // global middleware
// app.use(logfun);

// let data = [
//   {
//     id: 1,
//     username: "qwert",
//     password: "qwer123",
//   },
//   {
//     id: 2,
//     username: "ramesh",
//     password: "1234",
//   },
// ];

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "home route",
//   });
// });

// app.get("/user", (req, res) => {
//   res.status(200).json({
//     message: "all user",
//     data,
//   });
// });

// app.post("/user", (req, res) => {
//   console.log(req.body);

//   const { username, password } = req.body;
//   //validation
//   if (!username || !password) {
//     return res.status(400).json({
//       message: "username and password require",
//     });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({
//       message: "password strength is weak",
//     });
//   }

//   let newuser = {
//     id: user.length + 1,
//     ...req.body,
//   };

//   data.push(newuser);

//   res.status(200).json({
//     message: "user created",
//   });
// });

// app.put("/user/:id", (req, res) => {
//   let id = parseInt(req.params.id);
//   // find user by id
//   let userIdx = data.findIndex((ele) => ele.id == id);

//   if (userIdx == -1) {
//     res.status(400).json({
//       message: "user not found",
//     });
//   }
//   // create new updated user
//   data[userIdx] = { ...data[userIdx], ...req.body };

//   res.status(200).json({
//     message: "user updated",
//   });
// });

// app.delete("/user/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   const userIdx = data.findIndex((ele) => ele.id === id);
//   const userdeleted = data[userIdx];

//   if (userIdx == -1) {
//     return res.status(400).json({
//       message: "user not found",
//     });
//   }
//   data.splice(userIdx, 1);

//   res.status(200).json({
//     message: "user deleated",
//     user: userdeleted,
//   });
// });

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

/* ============================
   Task 1: Global Logger Middleware
============================ */
const logfun = (req, res, next) => {
  const logText = `Timestamp: ${new Date().toISOString()} | Method: ${req.method} | URL: ${req.url}\n`;
  fs.appendFileSync("./log.txt", logText);
  console.log(logText);
  next();
};

// apply globally
app.use(logfun);

/* ============================
   Task 2: Validation Middleware
============================ */
const userValidation = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "password strength is weak",
    });
  }

  next();
};

/* ============================
   Task 3: Authorization Middleware
============================ */
const authMiddleware = (req, res, next) => {
  const { token } = req.query;

  if (token !== "admin123") {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  next();
};

/* ============================
   Dummy Data
============================ */
let data = [
  { id: 1, username: "qwert", password: "qwer123" },
  { id: 2, username: "ramesh", password: "123456" },
];

/* ============================
   Routes
============================ */
app.get("/", (req, res) => {
  res.status(200).json({ message: "home route" });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "all users",
    data,
  });
});

/* -------- Task 2 applied here -------- */
app.post("/register", userValidation, (req, res) => {
  const newUser = {
    id: data.length + 1,
    ...req.body,
  };

  data.push(newUser);

  res.status(201).json({
    message: "user registered successfully",
    newUser,
  });
});

/* -------- Task 3 applied here -------- */
app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "welcome to profile page",
  });
});

app.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { username } = req.body;

  const userIdx = data.findIndex((u) => u.id === id);
  if (userIdx === -1) {
    return res.status(400).json({ message: "user not found" });
  }

  data[userIdx].username = username;
  res.status(200).json({ message: "user updated" });
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIdx = data.findIndex((u) => u.id === id);

  if (userIdx === -1) {
    return res.status(400).json({ message: "user not found" });
  }

  const deletedUser = data.splice(userIdx, 1);
  res.status(200).json({
    message: "user deleted",
    user: deletedUser[0],
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
