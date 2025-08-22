import express from "express";
import route from "./modules/index";
import  cors  from 'cors';
import { errorHandler } from "./Middlewares/error.middleware";

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api",route)
app.use(errorHandler)




export default app