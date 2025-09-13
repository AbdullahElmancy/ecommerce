import { Types } from "mongoose";
import userModel, { IUser } from "./user.model";
import { AppError } from "../../utils/AppError";

export const findByIdService  = async (id: Types.ObjectId) => {
    return await userModel.findById(id);
};
export const findUserService = async (email: string) => {
    return await userModel.findOne({ email });
}
export const findRefreshToken = async (refreshToken: string) => {
    return await userModel.findOne({ refreshToken });
}
export const addUserService = async(data:Partial<IUser>)=>{
    return await userModel.insertOne(data);
}

export const getAllUserService = async()=>{
    return await userModel.find({});
}



export const deleteUserService = async(id:Types.ObjectId)=>{
    return await userModel.findByIdAndDelete(id);
}

export const updateUserService = async(id:Types.ObjectId,data:Partial<IUser>)=>{
    return await userModel.findByIdAndUpdate(id,data,{new:true});
}