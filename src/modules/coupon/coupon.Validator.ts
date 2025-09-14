import z from "zod";
import { objectIdSchema } from "../../validator/ID.validator";

export const createCouponValidator = {
    body: z.object({
        name: z.string().min(3).max(50),
        expire: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        discount:z.number().min(0)
    })
}

export const getCouponValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}


export const updateCouponValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        name: z.string().min(3).max(50).optional(),
        expire: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        discount:z.number().min(0).optional()
    })
}

export const deleteCouponValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}