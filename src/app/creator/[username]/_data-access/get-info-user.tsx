"use server"

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createUsernameSchema = z.object({
  username: z.string({ message: "O username é obrigatiorio"})
})

type CreateUsernameSchema = z.infer<typeof createUsernameSchema>;

export async function getInfoUser(data: CreateUsernameSchema) {

  const schema = createUsernameSchema.safeParse(data)
  
  if (!schema.success) {
    return null
  }

  try{

    const user = await prisma.user.findUnique({
      where: {
        userName: data.username
      }
    })

    return user;

  }catch (err) {
    return null
  }
}