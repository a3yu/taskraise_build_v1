import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email address"),
});

export const signInSchema = z.object({
  password: z.string(),
  email: z.string(),
});
