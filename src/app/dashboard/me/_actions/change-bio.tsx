 "use server"

 import { z } from "zod";
 import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

const changeDescriptionSchema = z.object({
  description: z.string().min(4, "A descrição deve ter pelo menos 4 caracteres"),
})

type changeDescriptionSchemaType = z.infer<typeof changeDescriptionSchema>;

 export async function changeDescription(data: changeDescriptionSchemaType) {
  const session = await auth();
  const userId = session?.user.id;

  if(!userId) {
    return{
      data: null,
      error: "Usuário não autenticado"
    }
  }

  const schema = changeDescriptionSchema.safeParse(data);

  if(!schema.success) {
    return {
      data: null,
      error: schema.error.errors[0].message,
    }
  }

  try{

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        bio: data.description,
      }
    })

    return{
      data: user.name,
      error: null,
    }

  }catch(err) {
    console.log(err);
    return {
      data: null,
      error: "Error ao salvar alterações",

    }

  }

 }