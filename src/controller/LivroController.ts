import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class LivroController {
  static async listarTodos(req: Request, res: Response) {
    try {
      const livros = await LivroService.listarTodos();
      res.status(200).json({ success: true, data: livros, total: livros.length });
    } catch (error) {
      res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const novoLivro = await LivroService.criar(req.body);
      res.status(201).json({ success: true, data: novoLivro });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const livro = await LivroService.buscarPorId(parseInt(req.params.id));
      if (!livro) {
        return res.status(404).json({ success: false, message: "Livro não encontrado" });
      }
      res.status(200).json({ success: true, data: livro });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const livroAtualizado = await LivroService.atualizar(parseInt(req.params.id), req.body);
      res.status(200).json({ success: true, data: livroAtualizado });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const livroDeletado = await LivroService.deletar(parseInt(req.params.id));
      res.status(200).json({ success: true, data: livroDeletado });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }
}