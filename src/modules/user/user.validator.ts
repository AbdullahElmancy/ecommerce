import z from "zod";

export const createUserValidator = {
    body: z.object({
        first_name: z.string().min(3).max(50),
        last_name: z.string().min(3).max(50),
        email: z.email(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50),
    })
}

export const loginUserValidator = {
    body: z.object({
        email: z.email(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50),
    })
}

export const getUserValidator = {
    params: z.object({
        id: z.string().length(24),
    })
}

export const updateUserValidator = {
    body : z.object({
        first_name: z.string().min(3).max(50).optional(),
        last_name: z.string().min(3).max(50).optional(),
        email: z.email().optional(),
        mobile: z.string().optional(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50).optional(),
        role: z.string().min(3).max(50).optional(),
        avatar: z.string().optional(),
        cart: z.array(z.string()).optional(),
        wishlist: z.array(z.string().length(24)).optional(),
        addresses: z.array(z.string().length(24)).optional(),
    })
}

export const blockUserValidator = {
    params: z.object({
        id: z.string().length(24),
    })
}

export const unBlockUserValidator = {
    params: z.object({
        id: z.string().length(24),
    })
}

export const changeRoleValidator = {
    params: z.object({
        id: z.string().length(24),
    }),
    body:z.object({
        role:z.string().min(3).max(50)
    })
}

export const updatePasswordValidator = {
    body:z.object({
        oldPassword: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50),
        newPassword: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50),
    })
}

export const forgetPasswordValidator = {
     body:z.object({
        email:z.email()
    })
}

export const restPasswordValidator = {
    body:z.object({
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/).min(6).max(50),
    }),
    params:z.object({
        token:z.string().length(64).regex(/^[a-f0-9]+$/)
    })
}
