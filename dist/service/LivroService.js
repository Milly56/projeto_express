"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const prisma_1 = require("../database/prisma/prisma");
class LivroService {
    static async listarTodos() {
        return prisma_1.prisma.livro.findMany({
            orderBy: { livroId: "asc" },
        });
    }
    static async criar(data) {
        if (!data.titulo || !data.categoria) {
            throw new Error("Título e categoria são obrigatórios");
        }
        return prisma_1.prisma.livro.create({
            data: {
                titulo: data.titulo,
                categoria: data.categoria,
                quantidade: data.quantidade ?? 0,
            },
        });
    }
    static async buscarPorId(livroId) {
        if (isNaN(livroId))
            throw new Error("ID deve ser um número válido");
        return prisma_1.prisma.livro.findUnique({ where: { livroId } });
    }
    static async atualizar(livroId, data) {
        const livroExistente = await prisma_1.prisma.livro.findUnique({ where: { livroId } });
        if (!livroExistente)
            throw new Error("Livro não encontrado");
        return prisma_1.prisma.livro.update({
            where: { livroId },
            data: {
                titulo: data.titulo ?? livroExistente.titulo,
                categoria: data.categoria ?? livroExistente.categoria,
                quantidade: data.quantidade ?? livroExistente.quantidade,
            },
        });
    }
    static async deletar(livroId) {
        const livroExistente = await prisma_1.prisma.livro.findUnique({ where: { livroId } });
        if (!livroExistente)
            throw new Error("Livro não encontrado");
        return prisma_1.prisma.livro.delete({ where: { livroId } });
    }
}
exports.LivroService = LivroService;
