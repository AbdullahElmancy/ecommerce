import { Router } from "express";
import * as userController  from "./user.controller";

const route = Router();

route.get("/",userController.getUser)



export default route