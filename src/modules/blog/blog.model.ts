import { model, Schema, Types } from "mongoose"

export interface IBlog{
    _id?:Types.ObjectId
    title:string
    description:string
    category:Types.ObjectId
    numviews?:number
    isLiked?:boolean
    isDisliked?:boolean
    likes?:Types.ObjectId[]
    dislikes?:Types.ObjectId[]
    image?:string
    author:string
}

const blogSchema = new Schema<IBlog>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:Schema.Types.ObjectId,ref:"Category",required:true},
    numviews:{type:Number,default:0},
    image:{type:String,default:"https://res.cloudinary.com/dbxtdpfre/image/upload/v1756828957/iuyyn2hstoueoipb8zht.png"},
    author:{type:String,default:"admin"}
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
})


export const blogModel =  model<IBlog>("Blog",blogSchema)