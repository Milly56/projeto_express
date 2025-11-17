import { prisma } from "../database/prisma/prisma";

export class RetiradaService {

  static async listarTodas() {
    return prisma.retiradaLivro.findMany({
      orderBy: { data_retirada: "desc" },
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
    quantidade_livro: number;
    motivo_retirada: string;
    contato: string;
  }) {
    const { nomeUsuario, tituloLivro,quantidade_livro,motivo_retirada, contato } = data;

    if (!nomeUsuario || !tituloLivro || ! quantidade_livro || !motivo_retirada || !contato) {
      throw new Error(
        "Todos os campos são obrigatórios: nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato"
      );
    }

    return prisma.$transaction(async (tx) => {
      const livro = await tx.livro.findUnique({ where: { titulo: tituloLivro } });

      if (!livro) throw new Error("Livro não encontrado");
      if (livro.quantidade <  quantidade_livro)
        throw new Error("Quantidade de livros insuficiente");

      const retirada = await tx.retiradaLivro.create({
        data: {
          quantidade_livro,        
          motivo_retirada,
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
        data: { quantidade: livro.quantidade -  quantidade_livro },
      });

      return retirada;
    });
  }


  static async atualizar(
    retirada_id: number,
    data: {
      quantidadeLivro?: number;
      motivoRetirada?: string;
      contato?: string;
    }
  ) {
    const retiradaExistente = await prisma.retiradaLivro.findUnique({
      where: { retirada_id },  
    });

    if (!retiradaExistente) throw new Error("Retirada não encontrada");

    return prisma.retiradaLivro.update({
      where: { retirada_id }, 
      data: {
        quantidade_livro: data.quantidadeLivro ?? retiradaExistente.quantidade_livro,
        motivo_retirada: data.motivoRetirada ?? retiradaExistente.motivo_retirada,
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
        data_retorno: null,
      },
      include: { livro: true },
    });

    if (!retirada) throw new Error("Nenhuma retirada pendente encontrada");

    return prisma.$transaction(async (tx) => {
      const retiradaAtualizada = await tx.retiradaLivro.update({
        where: { retirada_id: retirada.retirada_id},
        data: { data_retorno: new Date() },
      });

      await tx.livro.update({
        where: { livroId: retirada.livro_id },
        data: {
          quantidade: retirada.quantidade_livro + retirada.quantidade_livro,
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
      where: { retirada_id: retirada.retirada_id },
    });
  }
}
