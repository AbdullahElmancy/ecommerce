import express, { Request, Response } from "express";
import dotenv from 'dotenv'
const app = express();

dotenv.config({path: './.env'})
const port = process.env.PORT_DEVELOPER;

app.use(express.json());



app.listen(port, () => {
  console.log(`server run`);
});
