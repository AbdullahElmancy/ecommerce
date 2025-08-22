import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
