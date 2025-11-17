import { prisma } from "../database/prisma/prisma";

export class LivroService {
  static async listarTodos() {
    return prisma.livro.findMany({
      orderBy: { livroId: "asc" },
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
        quantidade: data.quantidade ?? 0,
      },
    });
  }


  static async buscarPorTitulo(titulo: string) {
    if (!titulo) throw new Error("Você deve informar o título");

    return prisma.livro.findFirst({
      where: { titulo },
    });
  }

  static async atualizarPorTitulo(
    titulo: string,
    data: { titulo?: string; categoria?: string; quantidade?: number }
  ) {
    if (!titulo) throw new Error("Título atual é obrigatório");

    const livroExistente = await prisma.livro.findFirst({ where: { titulo } });
    if (!livroExistente) throw new Error("Livro não encontrado");

    return prisma.livro.update({
      where: { livroId: livroExistente.livroId },
      data: {
        titulo: data.titulo ?? livroExistente.titulo,
        categoria: data.categoria ?? livroExistente.categoria,
        quantidade: data.quantidade ?? livroExistente.quantidade,
      },
    });
  }

  static async deletarPorTituloEQuantidade(titulo: string, quantidade: number) {
    if (!titulo || quantidade == null) {
      throw new Error("Título e quantidade são obrigatórios");
    }

    const livroExistente = await prisma.livro.findFirst({
      where: { titulo, quantidade },
    });

    if (!livroExistente) {
      throw new Error("Nenhum livro encontrado com esse título e quantidade");
    }

    return prisma.livro.delete({
      where: { livroId: livroExistente.livroId },
    });
  }
}
