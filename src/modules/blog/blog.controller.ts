import { Request, Response } from "express"
import { successResponse } from "../../utils/response"
import { createBlogService, deleteBlogService, findBlogByIdService, getAllBlogsService, updateBlogService } from "./blog.service"
import { NotFoundError } from "../../utils/errors"
import cloudinary from "../../config/cloudnary"
import fs from "fs"
import { validId } from "../../utils/validId"
export const createBlogController = async(req:Request,res:Response)=>{
    if(!req.file) throw new NotFoundError("image not exist")
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path)
    req.body.image = result.public_id
    const blog =  await createBlogService(req.body)
    successResponse(res,blog,"blog created successfully")
}

export const getAllBlogsController = async(req:Request,res:Response)=>{
    const blogs = await getAllBlogsService(req.query)
    successResponse(res,blogs,"blogs fetched successfully")
}

export const getBlogController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const blog = await findBlogByIdService(objectId)
    if(!blog) throw new NotFoundError("blog not found")
    if(!blog?.numviews) blog.numviews = 1
    blog.numviews += 1
    await blog.save()
    successResponse(res,blog,"blog fetched successfully")
}

export const deleteBlogController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const blog = await deleteBlogService(objectId)
    if(!blog) throw new NotFoundError("blog not found")
    if(blog.image)  await cloudinary.uploader.destroy(blog.image)
    successResponse(res,blog,"blog deleted successfully")
}

export const updateBlogController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const blog = await updateBlogService(objectId,req.body)
    if(!blog) throw new NotFoundError("blog not found")
    successResponse(res,blog,"blog updated successfully")
}

export const updateBlogImageController = async(req:Request,res:Response)=>{
    if(!req.file) throw new NotFoundError("image not exist")
    const {id} = req.params
    const objectId = validId(id)
    const blog = await findBlogByIdService(objectId)
    if(!blog) throw new NotFoundError("blog not found")
    if(blog.image)  await cloudinary.uploader.destroy(blog.image)
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path)
    blog.image = result.public_id
    await blog.save()
    successResponse(res,blog,"blog updated successfully")
}

