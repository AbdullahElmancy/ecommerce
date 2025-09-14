import { Types } from "mongoose";
import { blogModel, IBlog } from "./blog.model";

export const createBlogService = async(data:Partial<IBlog>)=>{
    return await blogModel.insertOne(data);
}

export const getAllBlogsService = async(query = {})=>{
    return await blogModel.find(query).populate("category");
}

export const findBlogByIdService = async(id:Types.ObjectId)=>{
    return await blogModel.findById(id).populate("category");
}

export const updateBlogService = async(id:Types.ObjectId,data:Partial<IBlog>)=>{
    return await blogModel.findByIdAndUpdate(id,data,{new:true});
}


export const deleteBlogService = async(id:Types.ObjectId)=>{
    return await blogModel.findByIdAndDelete(id);
}