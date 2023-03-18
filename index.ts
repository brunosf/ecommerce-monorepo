import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "eshop-database" })
  .then(() => {
    console.log("Database connection is established");
  })
  .catch((error) => {
    console.log("Database connection is not established, error: " + error);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server on: http://localhost:${PORT}`);
});
