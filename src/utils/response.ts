import { Response } from "express"
const successResponse = (res:Response,data:object,message:string = "success",statusCode:number = 200)=>{
  return  res.status(statusCode).json({
        status:"success",
        message,
        data
    })
}


const errorResponse = (res:Response,message:string = "error",statusCode:number = 500, error:any = null)=>{
    return res.status(statusCode).json({
        status:"error",
        message,
        error
    })
}

export {successResponse,errorResponse}