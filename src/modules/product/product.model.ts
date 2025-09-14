import { model, Schema, Types } from "mongoose";

export interface IProduct {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  quantity: number;
  images: string[];
  color: string;
  brand: Types.ObjectId;
  ratings: {star:number,postedBy:Types.ObjectId}[];
  sold: number;
  totalRating: number
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: Array,

    quantity: {
        type:Number,
        required:true
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required:true
    },
    brand:{
      type:Schema.Types.ObjectId,
      ref:"Brand",
      required:true
    },
    color:{
      type:String,
      required:true
    },
    ratings: [
      {
        star: Number,
        comment:String,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
);

const productModel = model<IProduct>("Product",productSchema)

export default productModel