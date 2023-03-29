import { model, Schema } from "mongoose";

interface IReview {
  avatar: string;
  name: string;
  review: string;
}

interface IProduct {
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
  reviews: IReview[];
  countInStock: number;
  __v: number;
  richDescription?: string;
  images?: string[];
  dateCreated?: Date;
}

const productSchema = new Schema<IProduct>({
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
    ref: "Category",
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

productSchema.virtual("id").get(function () {
  return this._id.toString();
});

productSchema.set("toJSON", { virtuals: true });

export const Product = model<IProduct>("Product", productSchema);
