import { model, Schema } from "mongoose";

export interface ICoupon{
    name:string;
    expire:Date;
    discount:number
}

const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    expire:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})


const couponModel = model("coupon",couponSchema)
export default couponModel