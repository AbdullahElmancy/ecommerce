import z from "zod";
import { objectIdSchema } from "../../validator/ID.validator";

export const createCategoryValidator = {
    body: z.object({
        title: z.string().min(3).max(50),
        typeCategory:z.enum(["blog category","product category"])
    })
}

export const getCategoryValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}


export const updateCategoryValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        title: z.string().min(3).max(50).optional(),
        typeCategory: z.enum(["blog category","product category"]).optional()
    })
}

export const deleteCategoryValidator = {
    params: z.object({
        id: objectIdSchema,
    })
}