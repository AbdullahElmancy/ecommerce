import { Types } from "mongoose"
import productModel, { IProduct } from "./product.model"

export const findProductService = async(slug:string)=>{
    return await productModel.findOne({slug})
}

export const findProductByIdService = async(id:Types.ObjectId)=>{
    return await productModel.findById(id).populate("category",{title:1})
}
export const createProductService  =async(data:Partial<IProduct>)=>{
    return await productModel.insertOne(data)
}

export const getAllProductsService = async()=>{
 return await productModel.find({}).populate("category",{title:1})
}

export const updateProductService = async(id:Types.ObjectId,data:Partial<IProduct>)=>{
    return await productModel.findByIdAndUpdate(id,data,{new:true});
}

export const deleteProductService = async(id:Types.ObjectId)=>{
    return await productModel.findByIdAndDelete(id);
}