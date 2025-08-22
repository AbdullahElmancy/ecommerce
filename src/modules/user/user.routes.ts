import { Router } from "express";
import * as userController  from "./user.controller";
import { catchAsync } from "../../utils/catshAsync";

const route = Router();

route.get("/",catchAsync(userController.getUser))



export default route