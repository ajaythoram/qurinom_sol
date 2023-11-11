const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/AuthMiddleware");
const app = express();

app.post("/register", registerUser);
app.post("/login", loginUser);

module.exports = app;