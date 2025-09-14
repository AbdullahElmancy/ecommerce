import { Request, Response } from "express";
import { ICoupon } from "./coupon.model";
import { createCouponService, deleteCouponService, findCouponByIdService, findCouponService, getAllCouponsService, updateCouponService } from "./coupon.service";
import { successResponse } from "../../utils/response";
import { validId } from "../../utils/validId";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export const createCouponController =async(req:Request,res:Response)=>{
     const checkCoupon = await findCouponService(req.body.name)
    if(checkCoupon) throw new ForbiddenError("This Coupon already exist")
    const data:Partial<ICoupon> = req.body
    const Coupon = await createCouponService(data)
    successResponse(res,Coupon,"Coupon fetched successfully")
}

export const getAllCouponsController =async(req:Request,res:Response)=>{
    const Coupon = await getAllCouponsService()
    successResponse(res,Coupon,"all Coupons")
}

export const getCouponController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const Coupon = await findCouponByIdService(objectId)
    if(!Coupon) throw new NotFoundError("Coupon not found")
    successResponse(res,Coupon,"Coupon fetched successfully")
}

export const deleteCouponController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const Coupon = await deleteCouponService(objectId)
    if(!Coupon) throw new NotFoundError("Coupon not found")
    successResponse(res,Coupon,"Coupon deleted successfully")
}

export const updateCouponController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const Coupon = await updateCouponService(objectId,req.body)
    if(!Coupon) throw new NotFoundError("Coupon not found")
    successResponse(res,Coupon,"Coupon updated successfully")
}
