import express from "express";
import dotenv from "dotenv";
import dbconnect from "./db/dbconnect";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import ProductRoutes from "./routes/ProductRoutes";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

dbconnect(process.env.MONGODB_ATLAS_URL);

app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.listen(3000, () => {
  console.log("server running on port-", PORT);
});
