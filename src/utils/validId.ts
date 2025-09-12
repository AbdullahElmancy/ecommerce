import { Types } from "mongoose";
import { AppError } from "./AppError";

export const validId = (id: string) => {
    if(!Types.ObjectId.isValid(id)) throw new AppError("This id is not valid", 400);
    return new Types.ObjectId(id);
};