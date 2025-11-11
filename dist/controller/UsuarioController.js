"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
class UsuarioController {
    static async listarTodos(req, res) {
        try {
            const usuarios = await UsuarioService_1.UsuarioService.listarTodos();
            res.status(200).json({
                success: true,
                message: "Usuários listados com sucesso",
                data: usuarios,
                total: usuarios.length,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: getErrorMessage(error),
            });
        }
    }
    static async criar(req, res) {
        try {
            const { nome, data_nascimento, email, senha } = req.body;
            const novoUsuario = await UsuarioService_1.UsuarioService.criar({
                nome,
                data_nascimento,
                email,
                senha,
            });
            res.status(201).json({
                success: true,
                message: "Usuário criado com sucesso",
                data: novoUsuario,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error),
            });
        }
    }
    static async buscarPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const usuario = await UsuarioService_1.UsuarioService.buscarPorId(id);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado",
                });
            }
            res.status(200).json({
                success: true,
                message: "Usuário encontrado",
                data: usuario,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error),
            });
        }
    }
    static async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome, data_nascimento, email, senha } = req.body;
            const usuarioAtualizado = await UsuarioService_1.UsuarioService.atualizar(id, {
                nome,
                data_nascimento,
                email,
                senha,
            });
            res.status(200).json({
                success: true,
                message: "Usuário atualizado com sucesso",
                data: usuarioAtualizado,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error),
            });
        }
    }
    static async deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const usuarioDeletado = await UsuarioService_1.UsuarioService.deletar(id);
            res.status(200).json({
                success: true,
                message: "Usuário deletado com sucesso",
                data: usuarioDeletado,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: getErrorMessage(error),
            });
        }
    }
}
exports.UsuarioController = UsuarioController;
