import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RetiradaService {

  // LISTAR TODAS
  static async listarTodas() {
    const retiradas = await prisma.retiradaLivro.findMany({
      orderBy: { data_retirada: "desc" },
      include: { usuario: true, livro: true }
    });

    return {
      success: true,
      retiradas: retiradas.map(r => ({
        nomeUsuario: r.usuario.nome,
        tituloLivro: r.livro.titulo,
        quantidade: r.quantidade_livro,
        motivo: r.motivo_retirada,
        contato: r.contato,
        dataRetirada: r.data_retirada,
        dataDevolucao: r.data_retorno
      }))
    };
  }

  // LISTAR POR NOME E TÍTULO
  static async listarPorNomeETitulo(nomeUsuario: string, tituloLivro: string) {
    const retirada = await prisma.retiradaLivro.findFirst({
      where: { usuarioNome: nomeUsuario, livroTitulo: tituloLivro },
      include: { usuario: true, livro: true }
    });

    if (!retirada) {
      return { success: false, message: "Retirada não encontrada" };
    }

    return {
      success: true,
      retirada: {
        nomeUsuario: retirada.usuario.nome,
        tituloLivro: retirada.livro.titulo,
        quantidade: retirada.quantidade_livro,
        motivo: retirada.motivo_retirada,
        contato: retirada.contato,
        dataRetirada: retirada.data_retirada,
        dataDevolucao: retirada.data_retorno
      }
    };
  }

  // CRIAR
  static async criar(data: {
    nomeUsuario: string;
    tituloLivro: string;
    quantidadeLivro: number;
    motivoRetirada: string;
    contato: string;
  }) {
    const { nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato } = data;

    const usuario = await prisma.usuario.findUnique({
      where: { nome: nomeUsuario }
    });

    if (!usuario) {
      return { success: false, message: "Usuário não encontrado" };
    }

    const livro = await prisma.livro.findUnique({
      where: { titulo: tituloLivro }
    });

    if (!livro) {
      return { success: false, message: "Livro não encontrado" };
    }

    if (livro.quantidade < quantidadeLivro) {
      return {
        success: false,
        message: `Quantidade insuficiente. Apenas ${livro.quantidade} disponível(is).`
      };
    }

    const retirada = await prisma.retiradaLivro.create({
      data: {
        usuarioNome: nomeUsuario,
        livroTitulo: tituloLivro,
        quantidade_livro: quantidadeLivro,
        motivo_retirada: motivoRetirada,
        contato: contato
      },
      include: { usuario: true, livro: true }
    });

    await prisma.livro.update({
      where: { titulo: tituloLivro },
      data: { quantidade: livro.quantidade - quantidadeLivro }
    });

    return {
      success: true,
      message: "Retirada registrada com sucesso",
      retirada: {
        nomeUsuario: retirada.usuario.nome,
        tituloLivro: retirada.livro.titulo,
        quantidade: retirada.quantidade_livro,
        motivo: retirada.motivo_retirada,
        contato: retirada.contato,
        dataRetirada: retirada.data_retirada,
        dataDevolucao: retirada.data_retorno
      }
    };
  }

  // DEVOLVER
  static async registrarDevolucao(nomeUsuario: string, tituloLivro: string) {
    const retirada = await prisma.retiradaLivro.findFirst({
      where: { usuarioNome: nomeUsuario, livroTitulo: tituloLivro, data_retorno: null },
      include: { livro: true, usuario: true }
    });

    if (!retirada) {
      return { success: false, message: "Retirada não encontrada ou já devolvida" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.retiradaLivro.update({
        where: { retirada_id: retirada.retirada_id },
        data: { data_retorno: new Date() }
      });

      await tx.livro.update({
        where: { titulo: tituloLivro },
        data: {
          quantidade: retirada.livro.quantidade + retirada.quantidade_livro
        }
      });
    });

    return { success: true, message: "Devolução registrada com sucesso" };
  }

  // DELETAR
  static async deletar(nomeUsuario: string, tituloLivro: string) {
    const retirada = await prisma.retiradaLivro.findFirst({
      where: { usuarioNome: nomeUsuario, livroTitulo: tituloLivro }
    });

    if (!retirada) {
      return { success: false, message: "Nenhuma retirada encontrada" };
    }

    await prisma.retiradaLivro.delete({
      where: { retirada_id: retirada.retirada_id }
    });

    return { success: true, message: "Retirada removida com sucesso" };
  }
}
