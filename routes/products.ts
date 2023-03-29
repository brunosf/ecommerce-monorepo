import { Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
import { Category } from "../models/category";
import { Product } from "../models/product";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let filters = {};
    if (req.query.categories) {
      filters = { category: (req.query.categories as string).split(",") };
    }
    const products = await Product.find(filters).populate("category");
    if (!products)
      return res.status(500).json({ message: "No products found" });
    return res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Error on request products" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category");

    if (!product) return res.status(500).json({ message: "Product not found" });

    return res.status(200).send(product);
  } catch (error) {
    res.status(404).json({ message: "Product ID invalid" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).json({ message: "Invalid category" });
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });
    product = await product.save();

    if (!product)
      return res.status(500).json({ message: "Product not created" });

    res.send(product);
  } catch (error) {
    res.status(404).json({ message: "Error saving product" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).json({ message: "Invalid category" });
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!product)
      return res.status(500).json({ message: "Product not updated" });

    res.send(product);
  } catch (error) {
    res.status(404).json({ message: "Error updating product" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(404).json({ message: "Invalid ID" });

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({ message: "Product not deleted" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {}
});

router.get("/get/count", async (req: Request, res: Response) => {
  const productCount = await Product.countDocuments();
  if (!productCount) return res.status(500).json({ success: false });
  return res.status(200).json({ productCount });
});

router.get("/get/featured/:count", async (req: Request, res: Response) => {
  const count = req.params.count ? Number(req.params.count) : 0;
  const products = await Product.find({ isFeatured: true }).limit(count);

  if (!products) return res.status(500).json({ success: false });
  return res.status(200).json({ products });
});

export default router;
