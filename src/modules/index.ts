import { Router } from "express";

import useAuth from "./auth/auth.route"
const route = Router()

route.use("/auth",useAuth)
export default route