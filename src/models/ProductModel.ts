import mongoose, { Document } from "mongoose";

interface Product extends Document {
  name: string;
  price: number;
  description: string;
}

const productSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
