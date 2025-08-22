import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import { userRouter } from "./routes";
const app = express();

dotenv.config({path: './.env'})

app.use(express.json());
app.use(userRouter)







export default app