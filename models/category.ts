import { model, Schema } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  __v?: number;
  color?: string;
  icon?: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

export const Category = model<ICategory>("Category", categorySchema);
