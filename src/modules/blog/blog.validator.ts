import z from "zod";
import { serverFileSchema } from "../../validator/multer.validator";
import { objectIdSchema } from "../../validator/ID.validator";


export const createBlogValidator = {
    body: z.object({
        title: z.string().min(4).max(100),
        description: z.string().min(10),
        category: objectIdSchema,
        author: z.string().optional()
    }),
    file:serverFileSchema
};

export const getAllBlogValidator = {
     query: z
        .object({
          page: z
            .string()
            .regex(/^\d+$/, "Page must be a number")
            .transform(Number)
            .default(1)
            .transform((val) => Math.max(val, 1))
            .optional(),
          limit: z
            .string()
            .regex(/^\d+$/, "Limit must be a number")
            .transform(Number)
            .default(10)
            .transform((val) => Math.max(val, 1))
            .optional(),
          sort: z.string().optional(),
          fields: z.string().optional(),
        })
        .catchall(z.any()),
}

export const getBlogValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
}

export const deleteBlogValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
}

export const updateBlogValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        title: z.string().min(4).max(100).optional(),
        description: z.string().min(10).optional(),
        category: objectIdSchema.optional(),
    })
}

export const updateImageBlogValidator = {
    params: z.object({
        id: objectIdSchema,
    }),
    file:serverFileSchema
}

