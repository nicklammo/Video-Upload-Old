"use server";
import prisma from "./prisma";
import type { User } from "@prisma/client";

const isFieldValueTaken = async(formField: string, dbField: keyof User) => {
  const user = await prisma.user.count({
    where: {
      [dbField]: formField,
    }
  });

  if (user) return true;
  return false;
}

const getUsernameFromId  = async(id: number) =>{
  const username = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      username: true,
    }
  });

  console.log(username);
}

export { isFieldValueTaken, getUsernameFromId };