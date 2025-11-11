"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
class LivroController {
    static async listarTodos(req, res) {
        try {
            const livros = await LivroService_1.LivroService.listarTodos();
            res.status(200).json({ success: true, data: livros, total: livros.length });
        }
        catch (error) {
            res.status(500).json({ success: false, message: getErrorMessage(error) });
        }
    }
    static async criar(req, res) {
        try {
            const novoLivro = await LivroService_1.LivroService.criar(req.body);
            res.status(201).json({ success: true, data: novoLivro });
        }
        catch (error) {
            res.status(400).json({ success: false, message: getErrorMessage(error) });
        }
    }
    static async buscarPorId(req, res) {
        try {
            const livro = await LivroService_1.LivroService.buscarPorId(parseInt(req.params.id));
            if (!livro) {
                return res.status(404).json({ success: false, message: "Livro não encontrado" });
            }
            res.status(200).json({ success: true, data: livro });
        }
        catch (error) {
            res.status(400).json({ success: false, message: getErrorMessage(error) });
        }
    }
    static async atualizar(req, res) {
        try {
            const livroAtualizado = await LivroService_1.LivroService.atualizar(parseInt(req.params.id), req.body);
            res.status(200).json({ success: true, data: livroAtualizado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: getErrorMessage(error) });
        }
    }
    static async deletar(req, res) {
        try {
            const livroDeletado = await LivroService_1.LivroService.deletar(parseInt(req.params.id));
            res.status(200).json({ success: true, data: livroDeletado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: getErrorMessage(error) });
        }
    }
}
exports.LivroController = LivroController;
