import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class LoginService {
  async login(email: string, senha: string): Promise<string> {
    const user = await prisma.Login.findUnique({ where: { email } });

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
