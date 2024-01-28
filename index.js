const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

//dotenv config
dotenv.config();

//rest app
const app = express();
//database connection
connectDB();

//middlewares
app.use(morgan());
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", require("./routes/authRoute.js"));
app.use("/api/v1/courses", require("./routes/courseRoute.js"));

//listening
app.listen(process.env.PORT, () => {
  console.log(`Server is running on 8000`);
});
