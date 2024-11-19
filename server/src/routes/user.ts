import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import { SECERT } from "../config";
import { AuthenticateJwt } from "../middleware";

export const userRouter = express.Router();
const client = new PrismaClient();
userRouter.post("/signup",async(req:Request,res:Response)=>{
    try {
        const {email,username,password} = req.body;
        if (!email || !username || !password) {
            res.status(300).send({message:"Error! All field is required?/Something went wrong?"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await client.user.create({
            data:{
                email,
                username,
                password:hashedPassword
            }
        });
        res.status(201).json({
            message:"User Created Sucessfully!",
            user:newUser
        })
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send({ error: "Internal server error" });
    }
})

userRouter.get("/userlist",async(req:Request,res:Response)=>{
    try {
        const getAllUserList = await client.user.findMany();
        console.log(getAllUserList);
        
        res.status(200).json({
            message:"Fetched All User!",
            userList: getAllUserList

        })
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send({ error: "Internal server error" });
    }
})


userRouter.post("/signin",async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            res.status(300).send({message:"Error! All field is required?/Something went wrong?"})
        }
        const user = await client.user.findUnique({
            where:{
                email,
            }
        });

        if (user) {
            const token = Jwt.sign({
                userId:user.userId,
                email:user.email
            },SECERT,
            {expiresIn:"1h"})
            const checkPassword = await bcrypt.compare(password,user.password);
            if (checkPassword) {
                res.status(200).json({
                    message:"User Login Successfull!",
                    token:token
                })
            }
        }

    } catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
});

userRouter.post("/generate-ticket",AuthenticateJwt,async(req:Request,res:Response)=>{
    try {
        const 
        {
            movieName,
            userId,
            orderId,
            seatNo,
            totalAmount
        } = req.body;
        const ticket = await client.ticket.create({
            data:{
                movieName,
                userId,
                orderId,
                seatNo,
                totalAmount
            }
        });

        if (ticket) {
            const token = Jwt.sign({
                ticketId : ticket.ticketId,
            },SECERT,
            {expiresIn:"1h"})

            res.status(200).json({
                message:"Ticket Generated Sucessfully!",
                token:token
            });
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(404).send({ error: "Internal server error" });
    }
});
