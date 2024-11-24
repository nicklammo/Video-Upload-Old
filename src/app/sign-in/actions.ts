"use server";
import { ZodError } from "zod";
import { signInSchema } from "../lib/zod/schemas";
import { decrypt, login } from "@/auth";
import { UserSession } from "@/types";

interface Errors {
  [key: string]: string,
} 

export const signInAction = async(previousState: {errors: Errors}, formData: FormData) => {
  const newErrors: Errors = {};
  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
  }
  try {
    const cleanData = signInSchema.parse(rawFormData);
    const res = await fetch('http://localhost:3000/api/auth/sign-in', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(cleanData),
    });
    const data = await res.json();

    if (data.token) {
      const user = await decrypt(data.token) as UserSession['user'];
      await login(user);
    }

    if (data.success) {
      return {
        errors: newErrors,
        success: true,
      }
    } else {
      if (data.message) {
        throw new ZodError([
          {
            'code': 'custom',
            'path': ['username', 'password'],
            'message': data.message,
          },
        ]);
      }
    }
  } catch (e) {
    if (e instanceof ZodError) {
      e.errors.forEach(error => {
        error.path.forEach(path => newErrors[path] = error.message);
      });
    }
  }
  return {
    errors: newErrors,
    success: false,
  }
}