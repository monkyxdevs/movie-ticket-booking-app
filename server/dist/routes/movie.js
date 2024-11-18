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
exports.movieRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.movieRouter = express_1.default.Router();
const client = new client_1.PrismaClient();
exports.movieRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllMovies = yield client.movie.findMany();
        if (getAllMovies) {
            res.status(200).json({
                message: "Movies Fetched Successfully!"
            });
        }
        else {
            res.json({
                mesaage: []
            });
        }
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
}));
exports.movieRouter.post("/addmovies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieName, movieCategory, movieRating, movieVotes, movieImg } = req.body;
        if (!movieName || !movieCategory || !movieRating || !movieVotes || !movieImg) {
            res.status(400).json({ error: "All fields are required" });
        }
        const newMovie = yield client.movie.create({
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
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
}));
