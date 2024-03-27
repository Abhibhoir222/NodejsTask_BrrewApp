const dotenv = require("dotenv");
dotenv.config();

const app = require("./index")
const express = require("express");
const mongoose  = require("mongoose");

const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SV}/${process.env.DB_NAME}`,  
    console.log("in progress")
  )  
  .then(() => console.log("DB connected ---->" + " " +`${process.env.DB_TYPE} `+ "<----- "  + `${process.env.DB_NAME} `))
  .catch((error) => console.log(error));

  
app.listen(PORT, () => console.log("Server started on" + " " + `${PORT}`));