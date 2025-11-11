import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../database/prisma/prisma";

const loginSchema = z.object({
  email: z.string().email({ message: "Formato de e-mail inválido" }),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export class LoginService {
  async login(email: string, senha: string): Promise<string> {
    const parsedData = loginSchema.safeParse({ email, senha });
    if (!parsedData.success) {
      const erros = parsedData.error.issues.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      throw new Error(`Erro de validação: ${JSON.stringify(erros)}`);
    }

    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return token;
  }
}
