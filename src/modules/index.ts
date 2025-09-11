import { Router } from "express";

import useAuth from "./auth/auth.route"
import userRoute from "./user/user.route";
const route = Router()

route.use("/auth",useAuth)
route.use("/user",userRoute)
export default route