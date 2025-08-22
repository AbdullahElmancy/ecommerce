import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res,err.message || "Internal server error",err.statusCode || 500, err.errors)
};


