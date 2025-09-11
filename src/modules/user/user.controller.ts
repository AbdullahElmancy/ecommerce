import { Request, Response } from "express";
import { addUserService, deleteUserService, findByIdService, findUserService, getAllUserService, updateUserService } from "./user.service";
import { AppError } from "../../utils/AppError";
import { successResponse } from "../../utils/response";
import { comparePasswords, hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import { IUser } from "./user.model";
import { NotFoundError } from "../../utils/errors";
import { decryptMobile, encryptMobile } from "../../utils/mobile";

export const createUserController = async(req:Request,res:Response)=>{
    const {first_name,last_name,email,password} = req.body;
    const checkUser =await findUserService(email)
    if(checkUser) throw new AppError("User already exist",400)
    const hashPass = await hashPassword(password)
    const user = await addUserService({first_name,last_name,email,password:hashPass})
    successResponse(res,user,"User created successfully")
}


export const loginUserController = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    const user = await findUserService(email)
    if(!user) throw new AppError("Invalid email or password",400)
    const checkPass = await comparePasswords(password,user.password)
    if(!checkPass) throw new AppError("Invalid email or password",400)
    const token = generateToken({id:user._id},"7d")
    successResponse(res,{id:user._id,email,name:`${user?.first_name} ${user?.last_name}`,mobile:user?.mobile,role:user?.role,token},"User login successfully")
}


export const getAllUserController = async(req:Request,res:Response)=>{
    const users = await getAllUserService()
    if(!users) throw new NotFoundError("There is no users")
    successResponse(res,users,"User fetched successfully")
}

export const getUserController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const user = await findByIdService(id)
    if(!user) throw new NotFoundError("User not found")
    if(user.mobile) user.mobile = decryptMobile(user.mobile)
    successResponse(res,user,"User fetched successfully")
}


export const deleteUserController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const user = await deleteUserService(id)
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User deleted successfully")
}

export const updateUserController = async(req:Request,res:Response)=>{
    const {id} = req.params
    if(req.body.mobile) req.body.mobile = encryptMobile(req.body.mobile);
    const user = await updateUserService(id,req.body)
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User updated successfully")
}