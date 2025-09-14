import { Router } from "express";

import useAuth from "./auth/auth.route"
import userRoute from "./user/user.route";
import productRoute from "./product/product.route";
import categoryRoute from "./category/category.routes";
import blogRoute from "./blog/blog.route";
import brandRoute from "./brand/brand.routes";
import couponRoute from "./coupon/coupon.routes";

const route = Router()

route.use("/auth",useAuth)
route.use("/user",userRoute)
route.use("/product",productRoute)
route.use("/category",categoryRoute)
route.use("/blog",blogRoute)
route.use("/brand",brandRoute)
route.use("/coupon",couponRoute)
export default route