import categoryModel, { ICategory } from "./category.model";

export const createCategoryService = async(data:Partial<ICategory>)=>{
    return await categoryModel.insertOne(data)
}

export const getAllCategoriesService = async()=>{
    return await categoryModel.find({})
}