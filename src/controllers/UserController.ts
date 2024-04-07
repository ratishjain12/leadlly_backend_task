import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserModel";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!);
    res.cookie("token", token);
    res.json({ user, token });
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
};

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Fill all details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password, username });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
};

interface CustomReq extends Request {
  user?: any;
}
const editController = async (req: CustomReq, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
};

async function logoutController(req: Request, res: Response) {
  res.setHeader("Set-Cookie", "token=; Max-Age=0; Path=/; HttpOnly");
  res.status(200).json({ message: "loggedout successfully" });
}

export {
  loginController,
  registerController,
  editController,
  logoutController,
};
