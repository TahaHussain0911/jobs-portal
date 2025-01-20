require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connect");
const { databaseUrl, serverPort } = require("./utils/credentials");
const UserRouter = require("./routes/user");
const JobRouter = require("./routes/jobs");
const routeNotFound = require("./middlewares/routeNotFound");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/jobs", JobRouter);

app.all("*", routeNotFound);

app.use(globalErrorHandler);

const start = async () => {
  try {
    await connectDB(databaseUrl);
    app.listen(serverPort, () => {
      console.log(`Server listening on port ${serverPort}`);
    });
  } catch (error) {
    console.log(error, "error");
  }
};
start();
