import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class UsuarioService {

  static async listarTodos() {
    return prisma.usuario.findMany({
      orderBy: { id: "asc" },
      include: { retiradas: true } 
    });
  }

  static async criar(data: { nome: string; data_nascimento: string }) {
    if (!data.nome || !data.data_nascimento) {
      throw new Error("Nome e data de nascimento são obrigatórios");
    }

    const nascimento = new Date(data.data_nascimento);
    if (isNaN(nascimento.getTime())) {
      throw new Error("Data de nascimento inválida");
    }

    return prisma.usuario.create({
      data: {
        nome: data.nome,
        data_nascimento: nascimento
      }
    });
  }

  static async buscarPorId(id: number) {
    if (isNaN(id)) throw new Error("ID deve ser um número válido");

    return prisma.usuario.findUnique({
      where: { id },
      include: { retiradas: true } 
    });
  }

  static async atualizar(id: number, data: { nome?: string; data_nascimento?: string }) {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
    if (!usuarioExistente) throw new Error("Usuário não encontrado");

    let nascimento: Date | undefined = undefined;
    if (data.data_nascimento) {
      nascimento = new Date(data.data_nascimento);
      if (isNaN(nascimento.getTime())) {
        throw new Error("Data de nascimento inválida");
      }
    }

    return prisma.usuario.update({
      where: { id },
      data: {
        nome: data.nome ?? usuarioExistente.nome,
        data_nascimento: nascimento ?? usuarioExistente.data_nascimento
      }
    });
  }

  static async deletar(id: number) {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });
    if (!usuarioExistente) throw new Error("Usuário não encontrado");

    return prisma.usuario.delete({ where: { id } });
  }
}
