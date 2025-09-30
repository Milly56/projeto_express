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
        message: getErrorMessage(error)
      });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const novaRetirada = await RetiradaService.criar({
        usuarioId: parseInt(req.body.usuarioId),
        livroId: parseInt(req.body.livroId),
        quantidadeLivro: parseInt(req.body.quantidadeLivro),
        motivoRetirada: req.body.motivoRetirada,
        contato: req.body.contato
      });

      res.status(201).json({
        success: true,
        message: "Retirada registrada com sucesso",
        data: novaRetirada
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }

  static async registrarDevolucao(req: Request, res: Response) {
    try {
      const retiradaId = parseInt(req.params.id);

      const retiradaAtualizada = await RetiradaService.registrarDevolucao(retiradaId);

      res.status(200).json({
        success: true,
        message: "Devolução registrada com sucesso",
        data: retiradaAtualizada
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }
}