import z from "zod";

export const createProductValidator = {
  body: z.object({
    title: z.string().min(4).max(100),
    slug: z.string().min(4).max(100).optional(),
    description: z.string().min(10),
    price: z.number(),
    images: z.array(z.string()).optional(),
    quantity: z.number(),
    category: z.array(z.string()),
    brand: z.string(),
    color: z.string(),
  }),
};

export const getProductValidator = {
  params: z.object({
    id: z.string().length(24),
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
    id: z.string().length(24),
  }),
 body: z.object({
    title: z.string().min(4).max(100).optional(),
    slug: z.string().min(4).max(100).optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(1).optional(),
    images: z.array(z.string()).optional(),
    quantity: z.number().optional(),
    category: z.array(z.string()).optional(),
    brand: z.string().optional(),
    color: z.string().optional(),
    ratings: z.array(
      z.object({
        star: z.number().min(1).max(5).optional(),
        postedBy: z.string().length(24).optional(),
      })
    ).optional(),
    sold: z.number().min(0).optional(),
  }),
};

export const deleteProductValidator = {
  params: z.object({
    id: z.string().length(24),
  })
 
};
