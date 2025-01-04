require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connect");
const { databaseUrl, serverPort } = require("./helper/credentials");
const app = express();
app.use(express.json());
console.log(databaseUrl,'databaseUrl');

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
