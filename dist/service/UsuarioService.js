"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const prisma_1 = require("../database/prisma/prisma");
const criarUsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    data_nascimento: zod_1.z
        .string()
        .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Data de nascimento inválida",
    }),
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
class UsuarioService {
    static async listarTodos() {
        return prisma_1.prisma.usuario.findMany({
            orderBy: { id: "asc" },
            include: { retiradas: true },
        });
    }
    static async criar(data) {
        const validData = criarUsuarioSchema.parse(data);
        const nascimento = new Date(validData.data_nascimento);
        const senhaHash = await bcrypt_1.default.hash(validData.senha, 10);
        return prisma_1.prisma.usuario.create({
            data: {
                nome: validData.nome,
                data_nascimento: nascimento,
                email: validData.email,
                senha_hash: senhaHash,
            },
        });
    }
    static async buscarPorId(id) {
        if (isNaN(id))
            throw new Error("ID deve ser um número válido");
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { id },
            include: { retiradas: true },
        });
        if (!usuario)
            throw new Error("Usuário não encontrado");
        return usuario;
    }
    static async atualizar(id, data) {
        const usuarioExistente = await prisma_1.prisma.usuario.findUnique({ where: { id } });
        if (!usuarioExistente)
            throw new Error("Usuário não encontrado");
        let nascimento;
        if (data.data_nascimento) {
            nascimento = new Date(data.data_nascimento);
            if (isNaN(nascimento.getTime())) {
                throw new Error("Data de nascimento inválida");
            }
        }
        let senhaHash;
        if (data.senha) {
            if (data.senha.length < 6) {
                throw new Error("A senha deve ter no mínimo 6 caracteres");
            }
            senhaHash = await bcrypt_1.default.hash(data.senha, 10);
        }
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            throw new Error("Email inválido");
        }
        return prisma_1.prisma.usuario.update({
            where: { id },
            data: {
                nome: data.nome ?? usuarioExistente.nome,
                data_nascimento: nascimento ?? usuarioExistente.data_nascimento,
                email: data.email ?? usuarioExistente.email,
                senha_hash: senhaHash ?? usuarioExistente.senha_hash,
            },
        });
    }
    static async deletar(id) {
        const usuarioExistente = await prisma_1.prisma.usuario.findUnique({ where: { id } });
        if (!usuarioExistente)
            throw new Error("Usuário não encontrado");
        return prisma_1.prisma.usuario.delete({ where: { id } });
    }
}
exports.UsuarioService = UsuarioService;
