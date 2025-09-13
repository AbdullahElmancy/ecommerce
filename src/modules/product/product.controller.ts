import { Request, Response } from "express";
import { IProduct } from "./product.model";
import { createProductService, deleteProductService, findProductByIdService, findProductService, getAllProductsService, updateProductService } from "./product.service";
import { ForbiddenError, NotFoundError } from "../../utils/errors";
import { successResponse } from "../../utils/response";
import { validId } from "../../utils/validId";
import slugify from "slugify";

export const createProductController = async(req:Request,res:Response)=>{
    const data: IProduct = req.body
    if(data.title) data.slug = slugify(data.title,{lower:true})    
    if(!data) throw new NotFoundError("Where is Product!!")
    const checkSlug = await findProductService(data.slug)
    if(checkSlug) throw new ForbiddenError("This slug already exist")
    const createResult = await createProductService(data)
    successResponse(res,createResult,"This Product created successfully")
} 

export const getProductController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const product = await findProductByIdService(objectId)
    if(!product) throw new NotFoundError("Product not found")
    successResponse(res,product,"Product fetched successfully")
}

export const getAllProductsController = async(req:Request,res:Response)=>{
    const products =  await getAllProductsService()
    successResponse(res,products,"all Products fetched successfully")
}


export const updateProductController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const data:Partial<IProduct> = req.body
    if(data.title) data.slug = slugify(data.title,{lower:true})
    const product = await updateProductService(objectId,data)
    if(!product) throw new NotFoundError("Product not found")
    successResponse(res,product,"Product updated successfully")
}

export const deleteProductController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const product = await deleteProductService(objectId)
    if(!product) throw new NotFoundError("Product not found")
    successResponse(res,product,"Product deleted successfully")
}

