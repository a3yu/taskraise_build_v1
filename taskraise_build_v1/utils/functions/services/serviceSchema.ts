import { z } from "zod";

export const serviceSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title must be at most 50 characters long" }),
  description: z
    .string()
    .min(20, { message: "Description be more than 20 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  location_geo: z.string(),
  location: z.string(),
  price: z.coerce
    .number()
    .multipleOf(0.01, {
      message: "Please use a valid currency format: two decimal points.",
    })
    .min(2, {
      message: "Service must have a price over $2",
    }),
  order_details: z.string().min(1, {
    message: "Required.",
  }),
  service_details: z.string().min(1, {
    message: "Required.",
  }),
  thumbnail_path: z.string().min(1, {
    message: "Service must have a thumbnail.",
  }),
  service_type: z.string().min(1, {
    message: "Please select a type.",
  }),
});
