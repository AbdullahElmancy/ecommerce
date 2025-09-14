import { Request, Response } from "express";
import { IBrand } from "./brand.model";
import { createBrandService, deleteBrandService, findBrandByIdService, findBrandService, getAllBrandsService, updateBrandService } from "./brand.service";
import { successResponse } from "../../utils/response";
import { validId } from "../../utils/validId";
import { ForbiddenError, NotFoundError } from "../../utils/errors";

export const createBrandController =async(req:Request,res:Response)=>{
    const checkBrand = await findBrandService(req.body.title)
    if(checkBrand) throw new ForbiddenError("This brand already exist")
    const data:Partial<IBrand> = req.body
    const brand = await createBrandService(data)
    successResponse(res,brand,"brand fetched successfully")
}

export const getAllBrandsController =async(req:Request,res:Response)=>{
    const brand = await getAllBrandsService()
    successResponse(res,brand,"all Brands")
}

export const getBrandController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const brand = await findBrandByIdService(objectId)
    if(!brand) throw new NotFoundError("Brand not found")
    successResponse(res,brand,"Brand fetched successfully")
}

export const deleteBrandController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const brand = await deleteBrandService(objectId)
    if(!brand) throw new NotFoundError("Brand not found")
    successResponse(res,brand,"Brand deleted successfully")
}

export const updateBrandController =async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const brand = await updateBrandService(objectId,req.body)
    if(!brand) throw new NotFoundError("Brand not found")
    successResponse(res,brand,"Brand updated successfully")
}
