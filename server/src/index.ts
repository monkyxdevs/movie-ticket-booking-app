import express from "express";
import cors from "cors";
import { port } from "./config";
import { mainRouter } from "./routes";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/m1",mainRouter);

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})