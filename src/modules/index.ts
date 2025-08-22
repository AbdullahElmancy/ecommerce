import { Router } from "express";
import userRoute from "./user/user.routes"
const route = Router()
route.use(userRoute)

export default route