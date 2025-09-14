import { Types } from "mongoose";
import categoryModel, { ICategory } from "./category.model";

export const createCategoryService = async(data:Partial<ICategory>)=>{
    return await categoryModel.insertOne(data)
}

export const getAllCategoriesService = async()=>{
    return await categoryModel.find({})
}

export const findCategoryByIdService = async(id:Types.ObjectId)=>{
    return await categoryModel.findById(id)
}
export const findCategoryService = async(title:string)=>{
    return await categoryModel.findOne({title})
}

export const updateCategoryService = async(id:Types.ObjectId,data:Partial<ICategory>)=>{
    return await categoryModel.findByIdAndUpdate(id,data,{new:true})
}

export const deleteCategoryService = async(id:Types.ObjectId)=>{
    return await categoryModel.findByIdAndDelete(id)
}
