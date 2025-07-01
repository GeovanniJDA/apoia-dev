"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createUsernameSchema = z.object({
  slug: z.string().min(1, "O nome de usuário é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  price: z.number().min(1500, "Selecione um valor maior que R$15"),
  createId: z.string(),
});

type CreatePaymentSchema = z.infer<typeof createUsernameSchema>;

export async function createPayment(data: CreatePaymentSchema){
  const schema = createUsernameSchema.safeParse(data);

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    };
  }

  try {

    const creator = await prisma.user.findUnique({
      where:{
        id: data.createId
      }
    })



  } catch (err) {
    return{
      data: null,
      error: "Erro ao criar pagamento, tente novamente mais tarde.",
    }
  }
}