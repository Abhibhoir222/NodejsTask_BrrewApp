const express = require("express");
const app  = express();
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cookiParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");


dotenv.config();

const PORT = process.env.PORT || 8000;



//Import Route

const bookdetailsRoute = require("./routes/books.routes")

//* Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookiParser());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SV}/${process.env.DB_NAME}`,  
    console.log("in progress")
  )  
  .then(() => console.log("DB connected ---->" + " " +`${process.env.DB_TYPE} `+ "<----- "  + `${process.env.DB_NAME} `))
  .catch((error) => console.log(error));
  

//Routes Middleware

app.use("/api",bookdetailsRoute)



//ErrorHandler
app.use(errorHandler);

app.listen(PORT, () => console.log("Server started on" + " " + `${PORT}`));