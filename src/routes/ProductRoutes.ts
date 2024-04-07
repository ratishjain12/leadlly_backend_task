import express from "express";
import authenticationMiddleware from "../middlewares/Authentication";
import {
  createProduct,
  fetchAllProduct,
} from "../controllers/ProductController";
const router = express.Router();

router.post("/", authenticationMiddleware, fetchAllProduct);
router.post("/create", authenticationMiddleware, createProduct);
export default router;
