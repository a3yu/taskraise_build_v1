import { z } from "zod";

export const campaignCreation = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title must be at most 50 characters long" }),
  goal: z.coerce
    .number()
    .min(0, { message: "Goal must be more than $0" })
    .max(100000000, { message: "Goal must be less than $100,000,000" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
});
