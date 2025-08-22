import { Request,Response } from "express"
const getUser = (req:Request,res:Response):void=>{
    res.json({message:"hello from three"})
}



export {getUser}