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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     RetiradaLivro:
 *       type: object
 *       properties:
 *         retiradaId:
 *           type: integer
 *           example: 1
 *         quantidadeLivro:
 *           type: integer
 *           example: 2
 *         motivoRetirada:
 *           type: string
 *           example: "Estudo para prova"
 *         contato:
 *           type: string
 *           example: "(81) 99999-0000"
 *         dataRetirada:
 *           type: string
 *           format: date-time
 *           example: 2025-09-26T15:00:00Z
 *         dataRetorno:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *         usuarioId:
 *           type: integer
 *           example: 5
 *         livroId:
 *           type: integer
 *           example: 10
 */

/**
 * @openapi
 * /api/retiradas:
 *   get:
 *     summary: Lista todas as retiradas de livros
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de retiradas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RetiradaLivro'
 */
router.get("/", autenticarJWT, RetiradaController.listarTodas);

/**
 * @openapi
 * /api/retiradas/{id}:
 *   get:
 *     summary: Obtém uma retirada específica por ID
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retirada encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetiradaLivro'
 *       404:
 *         description: Retirada não encontrada
 */
router.get("/:id", autenticarJWT, RetiradaController.listarPorId);

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
 *               - usuarioId
 *               - livroId
 *               - quantidadeLivro
 *               - motivoRetirada
 *               - contato
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 5
 *               livroId:
 *                 type: integer
 *                 example: 10
 *               quantidadeLivro:
 *                 type: integer
 *                 example: 1
 *               motivoRetirada:
 *                 type: string
 *                 example: "Leitura para pesquisa"
 *               contato:
 *                 type: string
 *                 example: "(81) 91234-5678"
 *     responses:
 *       201:
 *         description: Retirada registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetiradaLivro'
 */
router.post("/", autenticarJWT, RetiradaController.criar);

/**
 * @openapi
 * /api/retiradas/{id}/devolver:
 *   put:
 *     summary: Registra a devolução de uma retirada
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devolução registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetiradaLivro'
 *       404:
 *         description: Retirada não encontrada
 */
router.put("/:id/devolver", autenticarJWT, RetiradaController.registrarDevolucao);

/**
 * @openapi
 * /api/retiradas/{id}:
 *   delete:
 *     summary: Remove uma retirada por ID
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retirada removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RetiradaLivro'
 *       404:
 *         description: Retirada não encontrada
 */
router.delete("/:id", autenticarJWT, RetiradaController.deletarPorId);

export default router;
