import { Request, Response } from "express";
import { LoginService } from "../service/LoginService";

const loginService = new LoginService();

export class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const token = await loginService.login(email, senha);

      return res.json({ token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(401).json({ error: err.message });
      }
      return res.status(500).json({ error: "Erro inesperado" });
    }
  }
}
