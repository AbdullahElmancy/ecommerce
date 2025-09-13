import { Router } from "express";

import useAuth from "./auth/auth.route"
import userRoute from "./user/user.route";
import productRoute from "./product/product.route";
import categoryRoute from "./category/category.routes";

const route = Router()

route.use("/auth",useAuth)
route.use("/user",userRoute)
route.use("/product",productRoute)
route.use("/category",categoryRoute)
export default route