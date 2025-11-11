"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const LoginService_1 = require("../service/LoginService");
const loginService = new LoginService_1.LoginService();
class LoginController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }
            const token = await loginService.login(email, senha);
            return res.json({ token });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(401).json({ error: err.message });
            }
            return res.status(500).json({ error: "Erro inesperado" });
        }
    }
}
exports.LoginController = LoginController;
