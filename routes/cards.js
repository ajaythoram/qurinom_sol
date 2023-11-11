const express = require('express');

const {creatCard,getUsercard,deletCard} = require("../controllers/card.js");
const {isAuth} = require("../middlewares/AuthMiddleware");

const app = express();

app.post("/create-card",isAuth,creatCard);
app.get("/getUser-card",isAuth,getUsercard);
app.delete("/delet-card/:cardId",isAuth,deletCard);

 module.exports = app;