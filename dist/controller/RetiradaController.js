"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetiradaController = void 0;
const RetiradaService_1 = require("../service/RetiradaService");
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
class RetiradaController {
    static async listarTodas(req, res) {
        try {
            const retiradas = await RetiradaService_1.RetiradaService.listarTodas();
            res.status(200).json({
                success: true,
                message: "Retiradas listadas com sucesso",
                data: retiradas,
                total: retiradas.length
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: getErrorMessage(error)
            });
        }
    }
    static async listarPorId(req, res) {
        try {
            const retiradaId = parseInt(req.params.id);
            const retirada = await RetiradaService_1.RetiradaService.listarPorId(retiradaId);
            res.status(200).json({
                success: true,
                message: "Retirada encontrada com sucesso",
                data: retirada
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: getErrorMessage(error)
            });
        }
    }
    static async criar(req, res) {
        try {
            const novaRetirada = await RetiradaService_1.RetiradaService.criar({
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
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error)
            });
        }
    }
    static async registrarDevolucao(req, res) {
        try {
            const retiradaId = parseInt(req.params.id);
            const retiradaAtualizada = await RetiradaService_1.RetiradaService.registrarDevolucao(retiradaId);
            res.status(200).json({
                success: true,
                message: "Devolução registrada com sucesso",
                data: retiradaAtualizada
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error)
            });
        }
    }
    static async deletarPorId(req, res) {
        try {
            const retiradaId = parseInt(req.params.id);
            const retiradaDeletada = await RetiradaService_1.RetiradaService.deletarPorId(retiradaId);
            res.status(200).json({
                success: true,
                message: "Retirada removida com sucesso",
                data: retiradaDeletada
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: getErrorMessage(error)
            });
        }
    }
}
exports.RetiradaController = RetiradaController;
