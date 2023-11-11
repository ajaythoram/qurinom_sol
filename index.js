const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require("./config/db");
const userRoutes = require("./routes/user");
  const cardRoutes = require('./routes/cards');
// middleware 
      
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
 // routes
  
  app.use('/user',userRoutes);
  app.use('/card',cardRoutes);
app.listen(process.env.PORT,()=>{

    console.log("server is running at ",process.env.PORT);
})
