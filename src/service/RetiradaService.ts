import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class RetiradaService {
  static async listarTodas() {
    return prisma.retiradaLivro.findMany({
      orderBy: { dataRetirada: "desc" },
      include: {
        usuario: true,
        livro: true
      }
    });
  }

  static async criar(data: {
    usuarioId: number;
    livroId: number;
    quantidadeLivro: number;
    motivoRetirada: string;
    contato: string;
  }) {
    if (
      !data.usuarioId ||
      !data.livroId ||
      !data.quantidadeLivro ||
      !data.motivoRetirada ||
      !data.contato
    ) {
      throw new Error(
        "Todos os campos são obrigatórios: usuarioId, livroId, quantidadeLivro, motivoRetirada, contato"
      );
    }

    return prisma.retiradaLivro.create({
      data: {
        usuarioId: data.usuarioId,
        livroId: data.livroId,
        quantidadeLivro: data.quantidadeLivro,
        motivoRetirada: data.motivoRetirada,
        contato: data.contato
      }
    });
  }

  static async registrarDevolucao(retiradaId: number) {
    if (isNaN(retiradaId)) {
      throw new Error("ID deve ser um número válido");
    }

    return prisma.retiradaLivro.update({
      where: { retiradaId },
      data: {
        dataRetorno: new Date()
      }
    });
  }
}