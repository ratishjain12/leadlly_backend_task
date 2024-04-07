import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface Req extends Request {
  user?: any;
}
const authenticationMiddleware = (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; //bearer token

  if (token == null) {
    return res.status(401); // unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
    if (err) {
      return res.status(403); // forbidden
    }

    req.user = user;

    return next();
  });
};

export default authenticationMiddleware;
