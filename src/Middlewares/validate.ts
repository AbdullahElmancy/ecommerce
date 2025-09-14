import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
type RequestPart = "body" | "params" | "query" | "file" | "files";
const headerKeys: RequestPart[] = ["body", "params", "query","file","files"];

export const validation = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];

    headerKeys.forEach((key) => {
      if (schema[key]) {
        const result = schema[key].safeParse(req[key]);
        if (!result.success) {
          errors.push(result.error.format());
        } else {
          if (key !== "query" ) {
            req[key] = result.data;
          }
        }
      }
    });

    if (errors.length > 0) {
      errorResponse(res, "Validation error", 400, "Fail",errors);
    } else {
      next();
    }
  };
};
