import { Request, Response, NextFunction } from "express";
import Product from "../models/ProductModel";

const fetchAllProduct = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const createProduct = async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ message: "Please enter all the required details!!" });
  }

  const product = await Product.create({ name, price, description });
  res.status(200).json({ product });
};
export { fetchAllProduct, createProduct };
