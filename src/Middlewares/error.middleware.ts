import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export const errorHandler = (err: { status: number; message: string,errors?:any }, req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res,err.message || "Internal server error",err.status || 500, err.errors)
};


