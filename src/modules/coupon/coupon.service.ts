import { Types } from "mongoose";
import couponModel, { ICoupon } from "./coupon.model";

export const createCouponService = async(data:Partial<ICoupon>)=>{
    return await couponModel.insertOne(data)
}

export const getAllCouponsService = async()=>{
    return await couponModel.find({})
}

export const findCouponByIdService = async(id:Types.ObjectId)=>{
    return await couponModel.findById(id)
}

export const updateCouponService = async(id:Types.ObjectId,data:Partial<ICoupon>)=>{
    return await couponModel.findByIdAndUpdate(id,data,{new:true})
}

export const deleteCouponService = async(id:Types.ObjectId)=>{
    return await couponModel.findByIdAndDelete(id)
}

export const findCouponService = async(name:string)=>{
    return await couponModel.findOne({name})
}

