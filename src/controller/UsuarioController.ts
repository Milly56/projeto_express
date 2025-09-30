import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class UsuarioController {
  
  static async listarTodos(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioService.listarTodos();
      res.status(200).json({
        success: true,
        message: "Usuários listados com sucesso",
        data: usuarios,
        total: usuarios.length
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
      const { nome, data_nascimento } = req.body;
      const novoUsuario = await UsuarioService.criar({ nome, data_nascimento });
      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        data: novoUsuario
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuario = await UsuarioService.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado"
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuário encontrado",
        data: usuario
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { nome, data_nascimento } = req.body;

      const usuarioAtualizado = await UsuarioService.atualizar(id, {
        nome,
        data_nascimento
      });

      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: usuarioAtualizado
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }
  static async deletar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuarioDeletado = await UsuarioService.deletar(id);

      res.status(200).json({
        success: true,
        message: "Usuário deletado com sucesso",
        data: usuarioDeletado
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error)
      });
    }
  }
}
