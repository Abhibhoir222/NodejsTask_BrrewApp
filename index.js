const express = require("express");
const app  = express();
const mongoose  = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cookiParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");





//Import Route

const bookdetailsRoute = require("./routes/books.routes")
const autherRoutes = require("./routes/auther.routes")
//* Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookiParser());


  

//Routes Middleware

app.use("/api",bookdetailsRoute)
app.use("/api",autherRoutes)


//ErrorHandler
app.use(errorHandler);
module.exports = app;