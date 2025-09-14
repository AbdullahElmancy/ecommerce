import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/errors";
import { verifyToken } from "../utils/jwt";
import { findByIdService } from "../modules/user/user.service";
import { IUser } from './../modules/user/user.model';

export const auth = (role: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const headerAuth = req.headers.authorization;

        if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
            throw new BadRequestError("Invalid token");
        }

        const token = headerAuth.split(" ")[1];
        const decoded: any = verifyToken(token);
        if (decoded.id === undefined) throw new BadRequestError("Invalid token");

        const findUser: IUser|null = await findByIdService(decoded.id);
        if (!findUser) throw new NotFoundError("you aren't exist");

        req.user = findUser;
                
        if(!findUser.role||!role.includes(findUser.role)) throw new UnauthorizedError("you aren't authorized");
        next();
    };
};
