import { model, Schema } from "mongoose";

interface Review {
  avatar: string;
  name: string;
  review: string;
}

interface Product {
  _id: string;
  image?: string;
  brand: string;
  price: number;
  rating: null | number;
  numReviews?: null | number;
  isFeatured?: boolean;
  name: string;
  description: string;
  category: {
    $oid: string;
  };
  reviews: Review[];
  countInStock: number;
  __v: number;
  richDescription?: string;
  images?: string[];
  dateCreated?: Date;
}

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export const product = model<Product>("products", productSchema);
