import { z } from "zod";
import { isFieldValueTaken } from "@/app/db/misc";

export const signUpSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters long').regex(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers or underscores'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signInSchema = signUpSchema.omit({
  email: true,
});