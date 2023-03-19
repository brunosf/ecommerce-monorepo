import { model, Schema } from "mongoose";

interface Reviews {
  avatar: string;
  name: string;
  review: string;
}

interface Product {
  _id: string;
  image: string;
  brand: string;
  price: number;
  rating: null | number;
  numReviews: null | number;
  isFeatured: boolean;
  name: string;
  description: string;
  category: {
    $oid: string;
  };
  reviews: Reviews[];
  countInStock: number;
  __v: number;
  richDescription: string;
  images: string[];
}

const productSchema = new Schema<Product>({});

export const product = model<Product>("products", productSchema);
