import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import productsRoute from "./routes/products";
import categoriesRoute from "./routes/categories";

const app = express();
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);

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
