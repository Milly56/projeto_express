import { Request, Response } from "express";
import { RetiradaService } from "../service/RetiradaService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class RetiradaController {
  static async listarTodas(req: Request, res: Response) {
    try {
      const retiradas = await RetiradaService.listarTodas();
      res.status(200).json({
        success: true,
        message: "Retiradas listadas com sucesso",
        data: retiradas,
        total: retiradas.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  static async listarPorNomeETitulo(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.query;

      const retirada = await RetiradaService.listarPorNomeETitulo(
        String(nomeUsuario),
        String(tituloLivro)
      );

      res.status(200).json({
        success: true,
        message: "Retirada encontrada com sucesso",
        data: retirada
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato } = req.body;

      const novaRetirada = await RetiradaService.criarRetiradaPorNomeETitulo({
        nomeUsuario,
        tituloLivro,
        quantidadeLivro: parseInt(quantidadeLivro),
        motivoRetirada,
        contato
      });

      res.status(201).json({
        success: true,
        message: "Retirada registrada com sucesso",
        data: novaRetirada
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  static async registrarDevolucao(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.body;

      const retiradaAtualizada = await RetiradaService.registrarDevolucao(
        nomeUsuario,
        tituloLivro
      );

      res.status(200).json({
        success: true,
        message: "Devolução registrada com sucesso",
        data: retiradaAtualizada
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.body;

      const retiradaDeletada = await RetiradaService.deletarPorNomeETitulo(
        nomeUsuario,
        tituloLivro
      );

      res.status(200).json({
        success: true,
        message: "Retirada removida com sucesso",
        data: retiradaDeletada
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }
}
