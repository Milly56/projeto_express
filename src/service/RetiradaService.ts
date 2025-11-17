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

  static async listarPorNomeETitulo(nomeUsuario: string, tituloLivro: string) {
    if (!nomeUsuario || !tituloLivro)
      throw new Error("Nome do usuário e título do livro são obrigatórios");

    const retirada = await prisma.retiradaLivro.findFirst({
      where: {
        usuario: { nome: nomeUsuario },
        livro: { titulo: tituloLivro },
      },
      include: { usuario: true, livro: true },
    });

    if (!retirada) throw new Error("Retirada não encontrada para esse usuário e livro");

    return retirada;
  }

  static async criarRetiradaPorNomeETitulo(data: {
    nomeUsuario: string;
    tituloLivro: string;
    quantidadeLivro: number;
    motivoRetirada: string;
    contato: string;
  }) {
    const { nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato } = data;

    if (!nomeUsuario || !tituloLivro || !quantidadeLivro || !motivoRetirada || !contato) {
      throw new Error(
        "Todos os campos são obrigatórios: nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato"
      );
    }

    return prisma.$transaction(async (tx) => {
      const livro = await tx.livro.findUnique({ where: { titulo: tituloLivro } });

      if (!livro) throw new Error("Livro não encontrado");
      if (livro.quantidade < quantidadeLivro)
        throw new Error("Quantidade de livros insuficiente");

      const retirada = await tx.retiradaLivro.create({
        data: {
          quantidadeLivro,
          motivoRetirada,
          contato,
          usuario: {
            connect: { nome: nomeUsuario },
          },
          livro: {
            connect: { titulo: tituloLivro },
          },
        },
        include: { usuario: true, livro: true },
      });

      await tx.livro.update({
        where: { livroId: livro.livroId },
        data: { quantidade: livro.quantidade - quantidadeLivro },
      });

      return retirada;
    });
  }


  static async atualizar(
    retiradaId: number,
    data: {
      quantidadeLivro?: number;
      motivoRetirada?: string;
      contato?: string;
    }
  ) {
    const retiradaExistente = await prisma.retiradaLivro.findUnique({
      where: { retiradaId },
    });

    if (!retiradaExistente) throw new Error("Retirada não encontrada");

    return prisma.retiradaLivro.update({
      where: { retiradaId },
      data: {
        quantidadeLivro: data.quantidadeLivro ?? retiradaExistente.quantidadeLivro,
        motivoRetirada: data.motivoRetirada ?? retiradaExistente.motivoRetirada,
        contato: data.contato ?? retiradaExistente.contato,
      },
      include: { usuario: true, livro: true },
    });
  }


  static async registrarDevolucao(nomeUsuario: string, tituloLivro: string) {
    const retirada = await prisma.retiradaLivro.findFirst({
      where: {
        usuario: { nome: nomeUsuario },
        livro: { titulo: tituloLivro },
        dataRetorno: null,
      },
      include: { livro: true },
    });

    if (!retirada) throw new Error("Nenhuma retirada pendente encontrada");

    return prisma.$transaction(async (tx) => {
      const retiradaAtualizada = await tx.retiradaLivro.update({
        where: { retiradaId: retirada.retiradaId },
        data: { dataRetorno: new Date() },
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

  static async deletarPorNomeETitulo(nomeUsuario: string, tituloLivro: string) {
    const retirada = await prisma.retiradaLivro.findFirst({
      where: {
        usuario: { nome: nomeUsuario },
        livro: { titulo: tituloLivro },
      },
    });

    if (!retirada) throw new Error("Retirada não encontrada");

    return prisma.retiradaLivro.delete({
      where: { retiradaId: retirada.retiradaId },
    });
  }
}
