import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class LivroService {

  static async listarTodos() {
    return prisma.livro.findMany({
      orderBy: { livroId: 'asc' }
    });
  }

  static async criar(data: { titulo: string; categoria: string; quantidade?: number }) {
    if (!data.titulo || !data.categoria) {
      throw new Error("Título e categoria são obrigatórios");
    }

    return prisma.livro.create({
      data: {
        titulo: data.titulo,
        categoria: data.categoria,
        quantidade: data.quantidade ?? 0
      }
    });
  }

  static async buscarPorId(livroId: number) {
    if (isNaN(livroId)) throw new Error("ID deve ser um número válido");

    return prisma.livro.findUnique({ where: { livroId } });
  }

  static async atualizar(livroId: number, data: { titulo?: string; categoria?: string; quantidade?: number }) {
    const livroExistente = await prisma.livro.findUnique({ where: { livroId } });
    if (!livroExistente) throw new Error("Livro não encontrado");

    return prisma.livro.update({
      where: { livroId },
      data: {
        titulo: data.titulo ?? livroExistente.titulo,
        categoria: data.categoria ?? livroExistente.categoria,
        quantidade: data.quantidade ?? livroExistente.quantidade
      }
    });
  }
  
  static async deletar(livroId: number) {
    const livroExistente = await prisma.livro.findUnique({ where: { livroId } });
    if (!livroExistente) throw new Error("Livro não encontrado");

    return prisma.livro.delete({ where: { livroId } });
  }
}
