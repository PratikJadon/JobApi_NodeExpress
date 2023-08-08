require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");
const authenticate = require("./middleware/authenticate");

//middleware
app.use(express.json());
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticate, jobRouter);

app.use(errorHandler);
app.use(notFound);

//server start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is Listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
