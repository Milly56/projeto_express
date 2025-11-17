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

  // AGORA buscando por título
  static async buscarPorTitulo(req: Request, res: Response) {
    try {
      const livro = await LivroService.buscarPorTitulo(req.params.titulo);
      res.status(200).json({ success: true, data: livro });
    } catch (error) {
      res.status(404).json({ success: false, message: getErrorMessage(error) });
    }
  }

  // Atualizar por título (pode ser parcial)
  static async atualizar(req: Request, res: Response) {
    try {
      const livroAtualizado = await LivroService.atualizarPorTitulo(
        req.params.titulo,
        req.body
      );
      res.status(200).json({ success: true, data: livroAtualizado });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }

  // Deletar por título + quantidade
  static async deletar(req: Request, res: Response) {
    try {
      const { titulo, quantidade } = req.body;
      const livroDeletado = await LivroService.deletarPorTituloEQuantidade(
        titulo,
        quantidade
      );
      res.status(200).json({ success: true, data: livroDeletado });
    } catch (error) {
      res.status(400).json({ success: false, message: getErrorMessage(error) });
    }
  }
}
