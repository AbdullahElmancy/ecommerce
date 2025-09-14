import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import { createCouponController, deleteCouponController, getAllCouponsController, getCouponController, updateCouponController } from "./coupon.controller";
import { validation } from "../../Middlewares/validate";
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from "./coupon.Validator";

const couponRoute = Router()

couponRoute.route("/").post(auth(endPoints.createCoupon),validation(createCouponValidator),catchAsync(createCouponController))
                        .get(auth(endPoints.GetCoupons),catchAsync(getAllCouponsController))
couponRoute.route("/:id").get(auth(endPoints.GetCoupons),validation(getCouponValidator),catchAsync(getCouponController))
                           .patch(auth(endPoints.updateAndDeleteCoupon),validation(updateCouponValidator),catchAsync(updateCouponController))
                           .delete(auth(endPoints.updateAndDeleteCoupon),validation(deleteCouponValidator),catchAsync(deleteCouponController))
export default couponRoute