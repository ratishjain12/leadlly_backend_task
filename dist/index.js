"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnect_1 = __importDefault(require("./db/dbconnect"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, dbconnect_1.default)(process.env.MONGODB_ATLAS_URL);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", UserRoutes_1.default);
app.listen(3000, () => {
    console.log("server running on port-", PORT);
});
