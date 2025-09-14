import { Request, Response } from "express";
import { IProduct } from "./product.model";
import { addRatingService, createProductService, deleteProductService, findProductByIdService, findProductService, getAllProductsService, updateProductService, updateRatingService } from "./product.service";
import { ForbiddenError, NotFoundError } from "../../utils/errors";
import { successResponse } from "../../utils/response";
import { validId } from "../../utils/validId";
import slugify from "slugify";
import { IUser } from "../user/user.model";
import cloudinary from "../../config/cloudnary";
import  fs  from 'fs';

export const createProductController = async(req:Request,res:Response)=>{
    const data: IProduct = req.body
    if(data.title) data.slug = slugify(data.title,{lower:true})    
    if(!data) throw new NotFoundError("Where is Product!!")
    const checkSlug = await findProductService(data.slug)
    if(checkSlug) throw new ForbiddenError("This slug already exist")
    if(req.files && (req.files as Express.Multer.File[]).length > 0){
        const files = req.files as Express.Multer.File[]
        const results = await Promise.all(files.map(file=> cloudinary.uploader.upload(file.path)))
        if(!data.images) data.images = []
        results.map(image=>data.images.push(image.public_id))
        files.map(file=>fs.unlinkSync(file.path))
    }
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
    const products =  await getAllProductsService(req.query)
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

export const ratingProductController = async(req:Request,res:Response)=>{
    if(!req.user) throw new NotFoundError("user is not exist")
    const {_id} = req.user as IUser
    if(!_id) throw new NotFoundError("id not exist")
    const {star,prodId,comment} = req.body
    const objectId = validId(prodId)
    const product = await findProductByIdService(objectId)
    if(!product) throw new NotFoundError("Product not found")
    const rating = product.ratings.find((r)=>r.postedBy.toString() === _id.toString())
    let result;
    if(rating){
        result = await updateRatingService(objectId,_id,star,comment)
    }else{
        result = await addRatingService(objectId,_id,star,comment)
    }
    if(result && result.ratings.length > 0) {
        const total = result.ratings.reduce((acc,curr)=>acc + curr.star,0)
        const average = total / result.ratings.length
        result.totalRating =  Math.round(average) 
        await result.save()
        successResponse(res,{result},"Product rating updated successfully")
    }

}
