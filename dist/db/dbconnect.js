"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function dbconnect(url) {
    try {
        mongoose_1.default.connect(url).then(() => {
            console.log("mongodb database connected!!");
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
exports.default = dbconnect;
