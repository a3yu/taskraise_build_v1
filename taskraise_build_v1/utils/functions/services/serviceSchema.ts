import { z } from "zod";

export const serviceSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title must be at most 50 characters long" }),
  description: z
    .string()
    .min(50, { message: "Description be more than 50 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
});
