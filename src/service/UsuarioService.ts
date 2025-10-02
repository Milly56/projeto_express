import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

const criarUsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  data_nascimento: z.string().refine(
    (val) => !isNaN(new Date(val).getTime()),
    { message: "Data de nascimento inválida" }
  ),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export class UsuarioService {
  static async listarTodos() {
    return prisma.usuario.findMany({
      orderBy: { id: "asc" },
      include: { retiradas: true },
    });
  }

  static async criar(data: { nome: string; data_nascimento: string; email: string; senha: string }) {
    const validData = criarUsuarioSchema.parse(data);

    const nascimento = new Date(validData.data_nascimento);
    const senhaHash = await bcrypt.hash(validData.senha, 10);

    return prisma.usuario.create({
      data: {
        nome: validData.nome,
        data_nascimento: nascimento,
        email: validData.email,
        senha_hash: senhaHash,
      },
    });
  }

  static async buscarPorId(id: number) {
    if (isNaN(id)) throw new Error("ID deve ser um número válido");

    return prisma.usuario.findUnique({
      where: { id },
      include: { retiradas: true },
    });
  }

  static async atualizar(
    id: number,
    data: { nome?: string; data_nascimento?: string; email?: string; senha?: string }
  ) {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
    if (!usuarioExistente) throw new Error("Usuário não encontrado");

    let nascimento: Date | undefined;
    if (data.data_nascimento) {
      nascimento = new Date(data.data_nascimento);
      if (isNaN(nascimento.getTime())) {
        throw new Error("Data de nascimento inválida");
      }
    }

    let senhaHash: string | undefined;
    if (data.senha) {
      if (data.senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }
      senhaHash = await bcrypt.hash(data.senha, 10);
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Email inválido");
    }

    return prisma.usuario.update({
      where: { id },
      data: {
        nome: data.nome ?? usuarioExistente.nome,
        data_nascimento: nascimento ?? usuarioExistente.data_nascimento,
        email: data.email ?? usuarioExistente.email,
        senha_hash: senhaHash ?? usuarioExistente.senha_hash,
      },
    });
  }

  static async deletar(id: number) {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
    if (!usuarioExistente) throw new Error("Usuário não encontrado");

    return prisma.usuario.delete({ where: { id } });
  }
}
