import { model, Schema, Types } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

export interface ICategory{
    _Id?:Types.ObjectId;
    title:string;
}

const categorySchema = new Schema({
    title:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const categoryModel = model("Category",categorySchema)
export default categoryModel