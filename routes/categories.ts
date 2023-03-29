import { Request, Response, Router } from "express";
import { ICategory, Category } from "../models/category";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const categories = await Category.find();
  return res.json(categories);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ status: "404 Not Found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  let category = new Category({
    name: req.body?.name,
    icon: req.body?.icon,
    color: req.body?.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(400).send("The category could not be saved");
  }
  return res.send(category);
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: req.body?.name,
        icon: req.body?.icon,
        color: req.body?.color,
      },
      { new: true }
    );

    if (!category) {
      return res.status(400).send("The category could not be updated");
    }
    return res.send(category);
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  Category.findByIdAndRemove(id)
    .then((category) => {
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "The category was not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Category was successfully removed" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err.message });
    });
});

export default router;
