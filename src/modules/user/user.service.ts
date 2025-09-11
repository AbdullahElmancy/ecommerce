import { Types } from "mongoose";
import userModel, { IUser } from "./user.model";
import { AppError } from "../../utils/AppError";

export const findByIdService  = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
    throw new AppError("This id is not valid", 400);
  }
    return await userModel.findById(id);
};
export const findUserService = async (email: string) => {
    return await userModel.findOne({ email });
}
export const addUserService = async(data:Partial<IUser>)=>{
    return await userModel.insertOne(data);
}

export const getAllUserService = async()=>{
    return await userModel.find({});
}


export const deleteUserService = async(id:string)=>{
    if(!Types.ObjectId.isValid(id)) throw new AppError("This id is not valid", 400);
    return await userModel.findByIdAndDelete(id);
}

export const updateUserService = async(id:string,data:Partial<IUser>)=>{
    if(!Types.ObjectId.isValid(id)) throw new AppError("This id is not valid", 400);
    return await userModel.findByIdAndUpdate(id,data,{new:true});
}