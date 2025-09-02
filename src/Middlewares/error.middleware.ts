import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import { AppError } from "../utils/AppError";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {    
    if(!(err instanceof AppError)){err = new AppError("Internal Server Error", 500);}
    return errorResponse(res,err.message || "Internal server error",err.statusCode || 500,err.status,err.stack)
};


