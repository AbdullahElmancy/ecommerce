import { Request,Response } from "express"
const getUser = (req:Request, res:Response) => {
    res.json({success:true, message:"get user"})
}



export {getUser}