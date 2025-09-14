import z from "zod";
import { objectIdSchema } from "../../validator/ID.validator";
import { serverFileSchema } from "../../validator/multer.validator";

export const createUserValidator = {
    body: z.object({
        first_name: z.string().min(3).max(50),
        last_name: z.string().min(3).max(50),
        email: z.email(),
        password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50),
    })
}

export const loginUserValidator = {
    body: z.object({
        email: z.email(),
        password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50),
    })
}

export const getUserValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}

export const updateUserValidator = {
    body : z.object({
        first_name: z.string().min(3).max(50).optional(),
        last_name: z.string().min(3).max(50).optional(),
        email: z.email().optional(),
        mobile: z.string().optional(),
        password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50).optional(),
        role: z.string().min(3).max(50).optional(),
        avatar: z.string().optional(),
        cart: z.array(z.string()).optional(),
        wishlist: z.array(objectIdSchema).optional(),
        addresses: z.array(objectIdSchema).optional(),
    })
}

export const blockUserValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}

export const unBlockUserValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}

export const changeRoleValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    body:z.object({
        role:z.string().min(3).max(50)
    })
}

export const updatePasswordValidator = {
    body:z.object({
        oldPassword: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50),
        newPassword: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50),
    })
}

export const forgetPasswordValidator = {
     body:z.object({
        email:z.email()
    })
}

export const restPasswordValidator = {
    body:z.object({
        password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+/).min(6).max(50),
    }),
    params:z.object({
        token:z.string().length(64).regex(/^[a-f0-9]+$/)
    })
}



export const wishValidator = {

    body:z.object({
        avatar:objectIdSchema
    })
}

export const uploadAvatarValidator = {
    file:serverFileSchema
    
}