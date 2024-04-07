"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //bearer token
    if (token == null) {
        return res.status(401); // unauthorized
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403); // forbidden
        }
        req.user = user;
        next();
    });
};
exports.default = authenticationMiddleware;
