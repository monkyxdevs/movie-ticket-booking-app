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
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("../middleware");
exports.userRouter = express_1.default.Router();
const client = new client_1.PrismaClient();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            res.status(300).send({ message: "Error! All field is required?/Something went wrong?" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield client.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        res.status(201).json({
            message: "User Created Sucessfully!",
            user: newUser
        });
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(500).send({ error: "Internal server error" });
    }
}));
exports.userRouter.get("/userlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUserList = yield client.user.findMany();
        console.log(getAllUserList);
        res.status(200).json({
            message: "Fetched All User!",
            userList: getAllUserList
        });
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(500).send({ error: "Internal server error" });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(300).send({ message: "Error! All field is required?/Something went wrong?" });
        }
        const user = yield client.user.findUnique({
            where: {
                email,
            }
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.userId,
                email: user.email
            }, config_1.SECERT, { expiresIn: "1h" });
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                res.status(200).json({
                    message: "User Login Successfull!",
                    token: token
                });
            }
        }
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
}));
exports.userRouter.post("/generate-ticket", middleware_1.AuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieName, userId, orderId, SeatNo, DateAndTime, totalAmount } = req.user;
        const ticket = yield client.ticket.create({
            data: {
                movieName,
                userId,
                orderId,
                SeatNo,
                DateAndTime,
                totalAmount
            }
        });
        if (ticket) {
            const token = jsonwebtoken_1.default.sign({
                ticketId: ticket.ticketId,
            }, config_1.SECERT, { expiresIn: "1h" });
            res.status(200).json({
                message: "Ticket Generated Sucessfully!",
                token: token
            });
        }
    }
    catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
}));
