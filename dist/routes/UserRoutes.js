"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
const router = express_1.default.Router();
router.post("/login", UserController_1.loginController);
router.post("/register", UserController_1.registerController);
router.post("/logout", UserController_1.logoutController);
router.post("/edit", Authentication_1.default, UserController_1.editController);
exports.default = router;
