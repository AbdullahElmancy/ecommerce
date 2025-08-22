import { Request,Response } from "express"
import { AppError } from "../../utils/AppError"
const getUser = async (req:Request, res:Response) => {
    throw new AppError("this not massage",500)
}



export {getUser}