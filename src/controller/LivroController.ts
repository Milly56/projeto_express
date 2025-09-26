import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class LivroController {

  // GET /livros - Listar todos os livros
  public static async listarTodos(req: Request, res: Response) {
    try {
      const livros = await prisma.livro.findMany({
        orderBy: { livroId: 'asc' }
      });

      res.status(200).json({
        success: true,
        message: "Livros listados com sucesso",
        data: livros,
        total: livros.length
      });

    } catch (error) {
      console.error('Erro ao listar livros:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // POST /livros - Criar um novo livro
  public static async criar(req: Request, res: Response) {
    try {
      const { titulo, categoria, quantidade } = req.body;

      // Validação simples
      if (!titulo || !categoria) {
        return res.status(400).json({
          success: false,
          message: "Título e categoria são obrigatórios"
        });
      }

      const novoLivro = await prisma.livro.create({
        data: {
          titulo,
          categoria,
          quantidade: quantidade || 0
        }
      });

      res.status(201).json({
        success: true,
        message: "Livro criado com sucesso",
        data: novoLivro
      });

    } catch (error) {
      console.error('Erro ao criar livro:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // GET /livros/:id - Buscar livro por ID
  public static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const livroId = parseInt(id);

      if (isNaN(livroId)) {
        return res.status(400).json({
          success: false,
          message: "ID deve ser um número válido"
        });
      }

      const livro = await prisma.livro.findUnique({
        where: { livroId }
      });

      if (!livro) {
        return res.status(404).json({
          success: false,
          message: "Livro não encontrado"
        });
      }

      res.status(200).json({
        success: true,
        message: "Livro encontrado",
        data: livro
      });

    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}
