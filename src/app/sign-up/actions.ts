"use server";
import { ZodError } from "zod";
import { signUpSchema } from "../lib/zod/schemas";
import { isFieldValueTaken } from "@/app/db/misc";
import { decrypt, login } from "@/auth";
import { User } from "@/types";

interface Errors {
  [key: string]: string,
}

export const signUpAction = async(previousState: {errors: Errors}, formData: FormData) => {
  const newErrors: Errors = {};
  const rawFormData = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  }
  try {
    const cleanData = signUpSchema.parse(rawFormData);
    const zodError = new ZodError([]);

    if (await isFieldValueTaken(cleanData.email, 'email')) {
      zodError.addIssue({
        'code': 'custom',
        'path': ['email'],
        'message': 'Email address is taken',
      });
    }

    if (await isFieldValueTaken(cleanData.username, 'username')) {
      zodError.addIssue({
        'code': 'custom',
        'path': ['username'],
        'message': 'Username is taken',
      });
    }

    if (!zodError.isEmpty) {
      throw zodError;
    }

    const res = await fetch('http://localhost:3000/api/auth/sign-up', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(cleanData),
    });
    const data = await res.json();

    if (data.token) {
      const user = await decrypt(data.token) as User;
      await login(user);
    }

    if (data.success) {
      return {
        errors: newErrors,
        success: true,
      }
    }
  } catch (e) {
    if (e instanceof ZodError) {
      e.errors.forEach((error) => {
        error.path.forEach(path => newErrors[path] = error.message);
      });
    }
  }

  return {
    errors: newErrors,
    success: false,
  }
}