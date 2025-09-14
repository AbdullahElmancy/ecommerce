import { model, Schema, Types } from "mongoose";
import { required } from "zod/v4/core/util.cjs";

export interface IBrand{
    _Id?:Types.ObjectId;
    title:string;
}

const brandSchema = new Schema<IBrand>({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true
    }
},{
    timestamps:true
})


const brandModel = model("Brand",brandSchema)
export default brandModel