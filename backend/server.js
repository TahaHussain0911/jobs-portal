require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connect");
const { databaseUrl, serverPort } = require("./utils/credentials");
const UserRouter = require("./routes/user");
const app = express();
app.use(express.json());

app.use("/api/v1/auth", UserRouter);




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
