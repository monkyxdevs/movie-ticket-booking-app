import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

export const movieRouter = express.Router();

const client = new PrismaClient()

movieRouter.get("/",async(req:Request,res:Response)=>{
    try {
        const getAllMovies = await client.movie.findMany();
        if (getAllMovies) {
            res.status(200).json({
                message:"Movies Fetched Successfully!",
                getAllMovies
            })
        } else{
            res.json({
                mesaage:[]
            })
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
});
movieRouter.post("/addmovies",async(req:Request,res:Response)=>{
    try {
        const {
            movieName,
            movieCategory,
            movieRating,
            movieVotes,
            movieImg
        } = req.body;
        if (!movieName || !movieCategory || !movieRating || !movieVotes || !movieImg) {
            res.status(400).json({ error: "All fields are required" });
          }
      
          const newMovie = await client.movie.create({
            data: {
              movieName,
              movieCategory,
              movieRating,
              movieVotes,
              movieImg,
            },
          });
      
          res.status(201).json({
            message: "Movie Created Successfully!",
            movie: newMovie,
          });
    } catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
});