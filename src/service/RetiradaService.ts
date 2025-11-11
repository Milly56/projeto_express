import { prisma } from "../database/prisma/prisma";

export class RetiradaService {
  static async listarTodas() {
    return prisma.retiradaLivro.findMany({
      orderBy: { dataRetirada: "desc" },
      include: {
        usuario: true,
        livro: true,
      },
    });
  }

  static async listarPorId(retiradaId: number) {
    if (isNaN(retiradaId)) throw new Error("ID deve ser um número válido");

    const retirada = await prisma.retiradaLivro.findUnique({
      where: { retiradaId },
      include: { usuario: true, livro: true },
    });

    if (!retirada) throw new Error("Retirada não encontrada");

    return retirada;
  }

  static async criar(data: {
    usuarioId: number;
    livroId: number;
    quantidadeLivro: number;
    motivoRetirada: string;
    contato: string;
  }) {
    const { usuarioId, livroId, quantidadeLivro, motivoRetirada, contato } = data;

    if (!usuarioId || !livroId || !quantidadeLivro || !motivoRetirada || !contato) {
      throw new Error(
        "Todos os campos são obrigatórios: usuarioId, livroId, quantidadeLivro, motivoRetirada, contato"
      );
    }

    return prisma.$transaction(async (tx: typeof prisma) => {
      const livro = await tx.livro.findUnique({
        where: { livroId },
      });

      if (!livro) throw new Error("Livro não encontrado");
      if (livro.quantidade < quantidadeLivro)
        throw new Error("Quantidade de livros insuficiente");

      const retirada = await tx.retiradaLivro.create({
        data: {
          usuarioId,
          livroId,
          quantidadeLivro,
          motivoRetirada,
          contato,
        },
        include: {
          usuario: true,
          livro: true,
        },
      });

      await tx.livro.update({
        where: { livroId },
        data: { quantidade: livro.quantidade - quantidadeLivro },
      });

      return retirada;
    });
  }

  static async registrarDevolucao(retiradaId: number) {
    if (isNaN(retiradaId)) throw new Error("ID deve ser um número válido");

    return prisma.$transaction(async (tx: typeof prisma) => {
      const retirada = await tx.retiradaLivro.findUnique({
        where: { retiradaId },
        include: { livro: true },
      });

      if (!retirada) throw new Error("Retirada não encontrada");
      if (retirada.dataRetorno) throw new Error("Devolução já registrada");

      const retiradaAtualizada = await tx.retiradaLivro.update({
        where: { retiradaId },
        data: { dataRetorno: new Date() },
        include: { usuario: true, livro: true },
      });

      await tx.livro.update({
        where: { livroId: retirada.livroId },
        data: {
          quantidade: retirada.livro.quantidade + retirada.quantidadeLivro,
        },
      });

      return retiradaAtualizada;
    });
  }

  static async deletarPorId(retiradaId: number) {
    if (isNaN(retiradaId)) throw new Error("ID deve ser um número válido");

    try {
      return await prisma.retiradaLivro.delete({
        where: { retiradaId },
      });
    } catch {
      throw new Error("Retirada não encontrada ou já foi removida");
    }
  }
}
