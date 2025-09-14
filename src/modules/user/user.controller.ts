import { Request, Response } from "express";
import { addToUserWishListService, addUserService, deleteUserService, findByIdService, findRefreshToken, findUserByToken, findUserService, getAllUserService, removeFromUserWishListService, updatePasswordService, updateUserService } from "./user.service";
import { AppError } from "../../utils/AppError";
import { successResponse } from "../../utils/response";
import { comparePasswords, createPasswordRestToken, hashPassword, passwordExpires } from "../../utils/password";
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "./user.model";
import { NotFoundError, UnauthorizedError } from "../../utils/errors";
import { decryptMobile, encryptMobile } from "../../utils/mobile";
import { validId } from "../../utils/validId";
import { sendMail } from "../../utils/virfyEmail";
import cloudinary from "../../config/cloudnary";
import  fs  from 'fs';

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
    const refreshToken = generateToken({id:user._id},"30d")
    user.refreshToken = refreshToken
    await user.save()
    res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000})
    successResponse(res,{id:user._id,email,name:`${user?.first_name} ${user?.last_name}`,mobile:user?.mobile,role:user?.role,token,refreshToken},"User login successfully")
}


export const getAllUserController = async(req:Request,res:Response)=>{
    const users = await getAllUserService()
    if(!users) throw new NotFoundError("There is no users")
    successResponse(res,users,"User fetched successfully")
}

export const getUserController = async(req:Request,res:Response)=>{
    const {id} = req.params
    const objectId = validId(id)
    const user = await findByIdService(objectId)
    if(!user) throw new NotFoundError("User not found")
    if(user.mobile) user.mobile = decryptMobile(user.mobile)
    successResponse(res,user,"User fetched successfully")
}


export const deleteUserController = async(req:Request,res:Response)=>{
    if(!req.user) throw new AppError("inter server error",505)
    const {_id} = req.user as IUser
    if(!_id) throw new NotFoundError("user not exist")
    const user = await deleteUserService(_id)
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User deleted successfully")
}

export const updateUserController = async(req:Request,res:Response)=>{
    if(!req.user) throw new AppError("inter server error",505)
    const {_id,role} = req.user as IUser
    if(!_id) throw new NotFoundError("user not exist")
    if(req.body.mobile) req.body.mobile = encryptMobile(req.body.mobile);
    if(role !== "superAdmin") throw new UnauthorizedError("your can't change your role") 
    const user = await updateUserService(_id,req.body)
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User updated successfully")
}

export const blockUserController = async(req:Request,res:Response)=>{
    const {id}= req.params
    const objectId =validId(id)
    const user = await updateUserService(objectId,{isBlocked:true})
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User updated successfully")
}

export const unBlockUserController = async(req:Request,res:Response)=>{
    const {id}= req.params
    const objectId =validId(id)
    const user = await updateUserService(objectId,{isBlocked:false})
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User updated successfully")
}


export const changeRole = async(req:Request,res:Response)=>{
    const {id}= req.params
    const objectId =validId(id)
    if(!req.body.role) throw new NotFoundError("Role not found")
    const user = await updateUserService(objectId,{role:req.body.role})
    if(!user) throw new NotFoundError("User not found")
    successResponse(res,user,"User updated successfully")
}

export const refreshTokenController = async(req:Request,res:Response)=>{
    const cookie = req.cookies.refreshToken;    
    if(!cookie) throw new NotFoundError("refresh token not found")
    const user = await findRefreshToken(cookie)
    if(!user) throw new NotFoundError("There is no user have this refresh token")
    const decode = verifyToken(cookie) as {id:string}
    if(decode.id !== (user._id).toString()) throw new NotFoundError("user not found")
    const refreshToken = generateToken({id:user._id},"30d")
    user.refreshToken = refreshToken
    await user.save()
    res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000})
    successResponse(res,{refreshToken},"generate new refresh token successfully")
}


export const logOutController = async(req:Request,res:Response)=>{
    const cookie = req.cookies.refreshToken;
    if(!cookie) throw new NotFoundError("refresh token not found")
    const user = await findRefreshToken(cookie)
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true,
        })
         throw new NotFoundError("There is no user have this refresh token")
    }
    user.refreshToken = ""
    await user.save()
      res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true,
        })   
    successResponse(res,{},"log out successfully")
}

export const updatePasswordController = async(req:Request,res:Response)=>{
    if(!req.user) throw new AppError("inter server error",505)
    const {_id,password} = req.user as IUser
    if(!_id) throw new NotFoundError("id is not found")
    const {oldPassword,newPassword} = req.body
    const hashedPassword = await hashPassword(newPassword)
    const checkPass = await comparePasswords(oldPassword,password)
    if(!checkPass) throw new AppError("Invalid password",400)
    const newPasswordUser = await updatePasswordService(_id,hashedPassword)
    if(!newPasswordUser) throw new NotFoundError("User not found")
    successResponse(res,newPasswordUser,"User updated successfully")
}

export const forgetPasswordTokenController = async(req:Request,res:Response)=>{
    const {email} = req.body;
    const user = await findUserService(email)
    if(!user) throw new NotFoundError("user wasn't found")
    user.passwordResetToken = createPasswordRestToken()
    user.passwordResetExpires = passwordExpires()
    await user.save()
    const token = user.passwordResetToken
    sendMail(email,token,req)
    successResponse(res,{token},"we send token")
}

export const restPasswordController = async(req:Request,res:Response)=>{
    const {password} = req.body;
    const {token} = req.params;
    const user = await findUserByToken(token)
    if(!user) throw new NotFoundError("user wasn't found")
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    user.passwordChangedAt = new Date(Date.now())
    user.passwordResetToken = undefined 
    user.passwordResetExpires = undefined
    await user.save()
    successResponse(res,user,"User updated successfully")
}

export const addToWishlistController = async(req:Request,res:Response)=>{
    if(!req.user) {throw new NotFoundError("user is not exist")}
    const {_id} = req.user as IUser
    if(!_id) throw new NotFoundError("id not exist")
    const {prodId} = req.body
    const ObjectProdId = validId(prodId)
    const user = await findByIdService(_id)
    const alreadyAdded = user?.wishlist?.includes(ObjectProdId)
    let addWish;
    if(alreadyAdded){
        addWish = await removeFromUserWishListService(ObjectProdId,_id)
        successResponse(res,{addWish},"wish removed from wish")
    }else{
        addWish = await addToUserWishListService(ObjectProdId,_id)
        successResponse(res,{addWish},"wish added to wish")
    }
}

export const updateAvatarUserController  = async(req:Request,res:Response)=>{
    if(!req.file) throw new NotFoundError("Avatar not found")
    const {_id} = req.user as IUser
    if(!_id) throw new NotFoundError("id not exist")
    const user = await findByIdService(_id)
    if(!user) throw new NotFoundError("User not found")
    if(user.avatar) await cloudinary.uploader.destroy(user.avatar)
    const result =await cloudinary.uploader.upload(req.file.path)
    fs.unlinkSync(req.file.path)
    user.avatar = result.public_id
    await user.save()
    successResponse(res,user,"User updated successfully")
}