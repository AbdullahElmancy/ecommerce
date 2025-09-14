import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"] as const;

const multerFileShape = z.object({
  fieldname: z.string().optional(),
  originalname: z.string(),
  encoding: z.string().optional(),
  mimetype: z.string(),
  size: z.number(),
  path: z.string().optional(),
  buffer: z.any().optional(),
});

export const serverFileSchema = multerFileShape.refine(
  (f) => ALLOWED_MIME.includes(f.mimetype as any),
  { message: "Unsupported file type" }
).refine(
  (f) => f.size <= MAX_FILE_SIZE,
  { message: `File must be <= ${MAX_FILE_SIZE / 1024 / 1024} MB` }
);


export const serverFilesSchema = z
  .array(multerFileShape)
  .min(1, "At least one image required")
  .max(5, "At most 5 images allowed")
  .refine((arr) => arr.every(f => ALLOWED_MIME.includes(f.mimetype as any)), {
    message: "One or more files have unsupported type",
  })
  .refine((arr) => arr.every(f => f.size <= MAX_FILE_SIZE), {
    message: `One or more files exceed ${MAX_FILE_SIZE / 1024 / 1024} MB`,
  });
