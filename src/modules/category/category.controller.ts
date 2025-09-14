import { Request, Response } from "express";
import { ICategory } from "./category.model";
import { createCategoryService, deleteCategoryService, findCategoryByIdService, findCategoryService, getAllCategoriesService, updateCategoryService } from "./category.service";
import { successResponse } from "../../utils/response";
import { validId } from "../../utils/validId";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export const createCategoryController =async(req:Request,res:Response)=>{
    const checkCategory = await findCategoryService(req.body.title)
    if(checkCategory) throw new ForbiddenError("This category already exist")
    const data:Partial<ICategory> = req.body
    const category = await createCategoryService(data)
    successResponse(res,category,"category fetched successfully")
}

export const getAllCategoriesController =async(req:Request,res:Response)=>{
    const category = await getAllCategoriesService()
    successResponse(res,category,"all categories")
}

export const getCategoryController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const category = await findCategoryByIdService(objectId)
    if(!category) throw new NotFoundError("category not found")
    successResponse(res,category,"category fetched successfully")
}

export const deleteCategoryController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const category = await deleteCategoryService(objectId)
    if(!category) throw new NotFoundError("category not found")
    successResponse(res,category,"category deleted successfully")
}

export const updateCategoryController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const category = await updateCategoryService(objectId,req.body)
    if(!category) throw new NotFoundError("category not found")
    successResponse(res,category,"category updated successfully")
}
