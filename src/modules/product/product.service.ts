import { Types } from "mongoose"
import productModel, { IProduct } from "./product.model"
import { validId } from "../../utils/validId"
import { NotFoundError } from "../../utils/errors"

export const findProductService = async(slug:string)=>{
    return await productModel.findOne({slug})
}

export const findProductByIdService = async(id:Types.ObjectId)=>{
    return await productModel.findById(id).populate("category",{title:1}).populate("brand",{title:1})
}
export const createProductService  =async(data:Partial<IProduct>)=>{
    return await productModel.insertOne(data)
}

export const getAllProductsService = async(queries:any = {})=>{
        const querySpread:any = {...queries}        
        if(querySpread.category) querySpread.category = validId(querySpread.category)
        const excludeFields = ['page','limit','sort','fields']
        excludeFields.forEach(field=>delete querySpread[field])
        let queryStringify = JSON.stringify(querySpread)
        queryStringify = queryStringify.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
        let query =  productModel.find(JSON.parse(queryStringify))
        if(queries.sort){
            const sortedBy = queries.sort.split(",").join(" ")            
            query = query.sort(sortedBy)
        }else{
            query = query.sort("-createdAt")
            
        }
          if(queries.fields){
            const selectedFields = queries.fields.split(",").join(" ")            
            query = query.select(selectedFields)
        }else{
            query = query.select("-__v")   
        }

        if(!queries.page) queries.page = 1
        if(!queries.limit) queries.limit = 10
        const skip = (Number(queries.page)-1)*Number(queries.limit)
        query = query.skip(skip).limit(Number(queries.limit))
        if(queries.page){
            const num = await productModel.countDocuments(JSON.parse(queryStringify))
            if(skip >= num) throw new NotFoundError("This page does not exist")
        }
        let product = await query.populate("category",{title:1}).populate("brand",{title:1})  
 return product
}

export const updateProductService = async(id:Types.ObjectId,data:Partial<IProduct>)=>{
    return await productModel.findByIdAndUpdate(id,data,{new:true});
}
export const deleteProductService = async(id:Types.ObjectId)=>{
    return await productModel.findByIdAndDelete(id);
}

export const addRatingService = async(prodId:Types.ObjectId,userId:Types.ObjectId,star:number,comment:string = "")=>{
    return await productModel.findByIdAndUpdate(prodId,{$push:{ratings:{star,postedBy:userId,comment}}},{new:true})
}

export const updateRatingService = async(prodId:Types.ObjectId,userId:Types.ObjectId,star:number,comment:string = "")=>{
    return await productModel.findOneAndUpdate(  { "ratings.postedBy": userId },
  { $set: { "ratings.$.star": star ,"ratings.$.comment":comment} },
  { new: true })
}
