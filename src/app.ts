import express from "express";
import route from "./modules/index";
import  cors  from 'cors';
import session from "express-session";
import passport from "./config/passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./Middlewares/error.middleware";
import bodyParser from "body-parser";


const app = express();
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE","PATCH"]
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api",route)




app.use(errorHandler)
export default app