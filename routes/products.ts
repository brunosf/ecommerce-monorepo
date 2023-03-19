import { Router } from "express";
import { product } from "../models/product";

const router = Router();

router.get("/", async (req, res) => {
  const products = await product.find();
  res.json(products);
});

export default router;
