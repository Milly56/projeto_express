import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UsuarioService {
  static async listarTodos() {
    return prisma.usuario.findMany({
      orderBy: { id: "asc" },
      include: { retiradas: true },
    });
  }

  static async criar(data: { nome: string; data_nascimento: string; email: string; senha: string }) {
    if (!data.nome || !data.data_nascimento || !data.email || !data.senha) {
      throw new Error("Nome, data de nascimento, email e senha são obrigatórios");
    }

    const nascimento = new Date(data.data_nascimento);
    if (isNaN(nascimento.getTime())) {
      throw new Error("Data de nascimento inválida");
    }

  
    const senhaHash = await bcrypt.hash(data.senha, 10);

    return prisma.usuario.create({
      data: {
        nome: data.nome,
        data_nascimento: nascimento,
        email: data.email,
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
      senhaHash = await bcrypt.hash(data.senha, 10);
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
