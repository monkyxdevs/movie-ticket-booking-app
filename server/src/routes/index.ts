import express from "express";
import { userRouter } from "./user";
import { movieRouter } from "./movie";

export const mainRouter = express.Router();

mainRouter.use("/user",userRouter);
mainRouter.use("/movie",movieRouter);
