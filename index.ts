import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import productsRoute from "./routes/products";

const app = express();
app.use(morgan("tiny"));

app.use("/products", productsRoute);

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
