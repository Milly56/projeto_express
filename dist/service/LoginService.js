"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = require("../database/prisma/prisma");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Formato de e-mail inválido" }),
    senha: zod_1.z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});
class LoginService {
    async login(email, senha) {
        const parsedData = loginSchema.safeParse({ email, senha });
        if (!parsedData.success) {
            const erros = parsedData.error.issues.map(err => ({
                field: err.path[0],
                message: err.message,
            }));
            throw new Error(`Erro de validação: ${JSON.stringify(erros)}`);
        }
        const user = await prisma_1.prisma.usuario.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const senhaValida = await bcrypt_1.default.compare(senha, user.senha_hash);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        return token;
    }
}
exports.LoginService = LoginService;
