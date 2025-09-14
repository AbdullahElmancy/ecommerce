import z from "zod";
import { serverFileSchema, serverFilesSchema } from "../../validator/multer.validator";
import { objectIdSchema } from "../../validator/ID.validator";

export const createProductValidator = {
  body: z.object({
    title: z.string().min(4).max(100),
    slug: z.string().min(4).max(100).optional(),
    description: z.string().min(10),
    price: z.coerce.number(),
    quantity: z.coerce.number(),
    category:z.string(),
    brand: z.string(),
    color: z.string(),
  }),
  files:serverFilesSchema
};

export const getProductValidator = {
  params: z.object({
    id: objectIdSchema,
  }),
};

export const getAllProductValidator = {
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
};

export const updateProductValidator = {
  params: z.object({
    id: objectIdSchema,
  }),
 body: z.object({
    title: z.string().min(4).max(100).optional(),
    slug: z.string().min(4).max(100).optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(1).optional(),
    quantity: z.number().optional(),
    category: z.array(z.string()).optional(),
    brand: z.string().optional(),
    color: z.string().optional(),
    ratings: z.array(
      z.object({
        star: z.number().min(1).max(5).optional(),
        postedBy: objectIdSchema.optional(),
      })
    ).optional(),
    sold: z.number().min(0).optional(),
  }),
};

export const deleteProductValidator = {
  params: z.object({
    id: objectIdSchema,
  })
};

export const rateProductValidator = {
  body: z.object({
    prodId: objectIdSchema,
    star: z.number().min(1).max(5),
    comment:z.string().min(5).max(100).optional()
  })
};

