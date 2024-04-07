import express from "express";
import {
  editController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/UserController";
import authenticationMiddleware from "../middlewares/Authentication";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);
router.post("/edit", authenticationMiddleware, editController);

export default router;
