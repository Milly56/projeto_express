import { Router } from "express";
import { LoginController } from "../controller/LoginController";

const router = Router();
const loginController = new LoginController();

/**
 * @openapi
 * tags:
 *   name: Autenticação
 *   description: Endpoints de login e autenticação de usuários
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/", (req, res) => loginController.login(req, res));

export default router;