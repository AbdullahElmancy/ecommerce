import { Types } from "mongoose";
import brandModel, { IBrand } from "./brand.model";

export const createBrandService = async(data:Partial<IBrand>)=>{
    return await brandModel.insertOne(data)
}

export const getAllBrandsService = async()=>{
    return await brandModel.find({})
}

export const findBrandByIdService = async(id:Types.ObjectId)=>{
    return await brandModel.findById(id)
}

export const updateBrandService = async(id:Types.ObjectId,data:Partial<IBrand>)=>{
    return await brandModel.findByIdAndUpdate(id,data,{new:true})
}

export const findBrandService = async(title:string)=>{
    return await brandModel.findOne({title})
}

export const deleteBrandService = async(id:Types.ObjectId)=>{
    return await brandModel.findByIdAndDelete(id)
}
