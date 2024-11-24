"use server";
import { cookies } from "next/headers";
import { isValidImage } from "./lib";
import { ZodError } from "zod";

const uploadAction = async(previousState: { success: boolean, errors: Map<string, string> }, formData: FormData) => {
  let newSuccess;
  let newErrors = new Map();
  const file = formData.get('image') as File;

  try {

   if (await isValidImage(file) === false) throw new ZodError([
    {
      'code': 'custom',
      'path': ['image'],
      'message': 'Invalid image format',
    },
   ]); 

    const token = cookies().get('session')?.value;
    if (!token) throw new ZodError([
      {
        'code': 'custom',
        'path': ['image'],
        'message': 'Invalid session data',
      }
    ]);

    formData.append('token', token);
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new ZodError([
      {
        'code': 'custom',
        'path': ['image'],
        'message': 'Failed to reach API',
      },
    ]);

    const data = await res.json();
    const expires = new Date(data.expires);
    cookies().set('session', data.session, { expires, httpOnly: true, secure: true, sameSite: 'strict' });

    newSuccess = true;

  } catch (e) {
    if(e instanceof ZodError) {
      e.errors.forEach(error => {
        error.path.forEach(path => newErrors.set(path, error.message));
      });
    }

    newSuccess = false;
  }

  return {
    success: newSuccess,
    errors: newErrors,
  }
}

export { uploadAction };