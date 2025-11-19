import { Router } from "express";
import { RetiradaController } from "../controller/RetiradaController";
import { autenticarJWT } from "../middleware/authMiddleware";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Retiradas
 *   description: Endpoints para gerenciar retiradas e devoluções de livros
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RetiradaLivro:
 *       type: object
 *       properties:
 *         nomeUsuario:
 *           type: string
 *         tituloLivro:
 *           type: string
 *         quantidade:
 *           type: integer
 *         motivo:
 *           type: string
 *         contato:
 *           type: string
 *         dataRetirada:
 *           type: string
 *           format: date-time
 *         dataDevolucao:
 *           type: string
 *           nullable: true
 *           format: date-time
 *       example:
 *         nomeUsuario: "Maria da Silva"
 *         tituloLivro: "O Senhor dos Anéis"
 *         quantidade: 5
 *         motivo: "Leitura para estudo"
 *         contato: "(81) 91234-5678"
 *         dataRetirada: "2025-01-01T12:00:00.000Z"
 *         dataDevolucao: null
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/retiradas:
 *   get:
 *     summary: Lista todas as retiradas registradas
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de retiradas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 retiradas:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/RetiradaLivro"
 */
router.get("/", autenticarJWT, RetiradaController.listarTodas);

/**
 * @openapi
 * /api/retiradas/buscar:
 *   get:
 *     summary: Busca uma retirada pelo nome do usuário e título do livro
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nomeUsuario
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: tituloLivro
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retirada encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 retirada:
 *                   $ref: "#/components/schemas/RetiradaLivro"
 *       404:
 *         description: Nenhuma retirada encontrada
 */
router.get("/buscar", autenticarJWT, RetiradaController.listarPorNomeETitulo);

/**
 * @openapi
 * /api/retiradas:
 *   post:
 *     summary: Registra uma nova retirada de livro
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeUsuario
 *               - tituloLivro
 *               - quantidadeLivro
 *               - motivoRetirada
 *               - contato
 *             properties:
 *               nomeUsuario:
 *                 type: string
 *               tituloLivro:
 *                 type: string
 *               quantidadeLivro:
 *                 type: integer
 *               motivoRetirada:
 *                 type: string
 *               contato:
 *                 type: string
 *     responses:
 *       201:
 *         description: Retirada registrada com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post("/", autenticarJWT, RetiradaController.criar);

/**
 * @openapi
 * /api/retiradas/devolver:
 *   put:
 *     summary: Registra devolução de um livro
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeUsuario
 *               - tituloLivro
 *             properties:
 *               nomeUsuario:
 *                 type: string
 *               tituloLivro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devolução registrada com sucesso
 *       404:
 *         description: Retirada não encontrada
 */
router.put("/devolver", autenticarJWT, RetiradaController.registrarDevolucao);

/**
 * @openapi
 * /api/retiradas/deletar:
 *   delete:
 *     summary: Remove uma retirada pelo nome do usuário e título do livro
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomeUsuario
 *               - tituloLivro
 *             properties:
 *               nomeUsuario:
 *                 type: string
 *               tituloLivro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retirada removida com sucesso
 *       404:
 *         description: Retirada não encontrada
 */
router.delete("/deletar", autenticarJWT, RetiradaController.deletar);

export default router;
