"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.editController = exports.registerController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = new UserModel_1.default({ email, password });
        yield newUser.save();
        res.status(200).json({ message: "User registered successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerController = registerController;
const editController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userId = req.params.id; // Assuming the user ID is passed as a route parameter
        // Check if the email and password are provided
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Update the user
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, { email, password: hashedPassword }, { new: true });
        // Check if user exists
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Respond with success message
        res.json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.editController = editController;
function logoutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.logoutController = logoutController;
