import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class RetiradaController {

  // GET /retiradas - Listar todas as retiradas
  public static async listarTodas(req: Request, res: Response) {
    try {
      const retiradas = await prisma.retiradaLivro.findMany({
        orderBy: { dataRetirada: 'desc' }
      });

      res.status(200).json({
        success: true,
        message: "Retiradas listadas com sucesso",
        data: retiradas,
        total: retiradas.length
      });

    } catch (error) {
      console.error('Erro ao listar retiradas:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // POST /retiradas - Criar nova retirada
  public static async criar(req: Request, res: Response) {
    try {
      const { pessoa, livro, quantidadeLivro, motivoRetirada, contato } = req.body;

      // Validação simples
      if (!pessoa || !livro || !quantidadeLivro || !motivoRetirada || !contato) {
        return res.status(400).json({
          success: false,
          message: "Todos os campos são obrigatórios: pessoa, livro, quantidadeLivro, motivoRetirada, contato"
        });
      }

      const novaRetirada = await prisma.retiradaLivro.create({
        data: {
          pessoa,
          livro,
          quantidadeLivro: parseInt(quantidadeLivro),
          motivoRetirada,
          contato
          // dataRetirada será preenchida automaticamente
        }
      });

      res.status(201).json({
        success: true,
        message: "Retirada registrada com sucesso",
        data: novaRetirada
      });

    } catch (error) {
      console.error('Erro ao criar retirada:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // PUT /retiradas/:id/devolver - Registrar devolução
  public static async registrarDevolucao(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const retiradaId = parseInt(id);

      if (isNaN(retiradaId)) {
        return res.status(400).json({
          success: false,
          message: "ID deve ser um número válido"
        });
      }

      const retiradaAtualizada = await prisma.retiradaLivro.update({
        where: { retiradaId },
        data: {
          dataRetorno: new Date()
        }
      });

      res.status(200).json({
        success: true,
        message: "Devolução registrada com sucesso",
        data: retiradaAtualizada
      });

    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}