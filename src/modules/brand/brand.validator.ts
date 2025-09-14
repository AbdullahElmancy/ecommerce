import z from "zod";
import { objectIdSchema } from "../../validator/ID.validator";

export const createBrandValidator = {
    body: z.object({
        title: z.string().min(3).max(50),
       
    })
}

export const getBrandValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}


export const updateBrandValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        title: z.string().min(3).max(50).optional(),
    })
}

export const deleteBrandValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}