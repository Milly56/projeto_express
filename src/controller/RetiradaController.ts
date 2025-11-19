import { Request, Response } from "express";
import { RetiradaService } from "../service/RetiradaService";

export class RetiradaController {

  static async listarTodas(req: Request, res: Response) {
    try {
      const dados = await RetiradaService.listarTodas();
      return res.json({ success: true, retiradas: dados });
    } catch (error) {
      console.error("Erro ao listar todas as retiradas:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao listar retiradas"
      });
    }
  }

  static async listarPorNomeETitulo(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.query;

      if (!nomeUsuario || !tituloLivro) {
        return res.status(400).json({
          success: false,
          message: "Informe nomeUsuario e tituloLivro pelos query params"
        });
      }

      const retirada = await RetiradaService.listarPorNomeETitulo(
        String(nomeUsuario),
        String(tituloLivro)
      );

      if (!retirada.success) {
        return res.status(404).json(retirada);
      }

      return res.json(retirada);

    } catch (error) {
      console.error("Erro ao listar por nome e título:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao buscar retirada"
      });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato } = req.body;

      if (!nomeUsuario || !tituloLivro || !quantidadeLivro || !motivoRetirada || !contato) {
        return res.status(400).json({
          success: false,
          message:
            "Todos os campos são obrigatórios: nomeUsuario, tituloLivro, quantidadeLivro, motivoRetirada, contato"
        });
      }

      const retirada = await RetiradaService.criar({
        nomeUsuario,
        tituloLivro,
        quantidadeLivro,
        motivoRetirada,
        contato
      });

      return res.status(201).json(retirada);

    } catch (error) {
      console.error("Erro ao criar retirada:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao criar retirada"
      });
    }
  }

  static async registrarDevolucao(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.body;

      if (!nomeUsuario || !tituloLivro) {
        return res.status(400).json({
          success: false,
          message: "Informe nomeUsuario e tituloLivro"
        });
      }

      const resultado = await RetiradaService.registrarDevolucao(
        nomeUsuario,
        tituloLivro
      );

      if (!resultado.success) {
        return res.status(404).json(resultado);
      }

      return res.json(resultado);

    } catch (error) {
      console.error("Erro ao registrar devolução:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao registrar devolução"
      });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const { nomeUsuario, tituloLivro } = req.body;

      if (!nomeUsuario || !tituloLivro) {
        return res.status(400).json({
          success: false,
          message: "Informe nomeUsuario e tituloLivro"
        });
      }

      const resultado = await RetiradaService.deletar(nomeUsuario, tituloLivro);

      if (!resultado.success) {
        return res.status(404).json(resultado);
      }

      return res.json(resultado);

    } catch (error) {
      console.error("Erro ao deletar retirada:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno ao deletar retirada"
      });
    }
  }
}
