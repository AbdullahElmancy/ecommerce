import { Request, Response } from "express";
import { ICategory } from "./category.model";
import { createCategoryService, getAllCategoriesService } from "./category.service";
import { successResponse } from "../../utils/response";

export const createCategoryController =async(req:Request,res:Response)=>{
    const data:Partial<ICategory> = req.body
    const category = await createCategoryService(data)
    successResponse(res,category,"category fetched successfully")
}

export const getAllCategoriesController =async(req:Request,res:Response)=>{
    const category = await getAllCategoriesService()
    successResponse(res,category,"all categories")
}
