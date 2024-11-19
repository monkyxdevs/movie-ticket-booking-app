import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECERT } from "./config";
import { PrismaClient } from "@prisma/client";

// declare global {
//     namespace Express {
//       interface Request {
//         user?: any; 
//         movie?:any;
//       }
//     }
//   }
  
export async function AuthenticateJwt(req: Request, res: Response, next: NextFunction) {
  const authorizationHeaders = req.header('Authorization')?.replace('Bearer ', '');
  const client = new PrismaClient
  if (!authorizationHeaders) {
    return res.status(403).json({ message: "Access Denied: No Token Provided" });
  }
  try {
    const decoded = jwt.verify(authorizationHeaders, SECERT) as { userId: number; email: string };

    const user = await client.user.findUnique({ where: { userId: decoded.userId } });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    if (user.email !== decoded.email) {
      return res.status(400).send({ message: "Token data does not match user data" });
    }
    next();
  } catch (error) {
    return res.status(400).send({ message: "Invalid or Expired Token" });
  }
}
