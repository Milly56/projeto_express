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
 *                 type: object
 *                 properties:
 *                   retiradaId:
 *                     type: integer
 *                     example: 1
 *                   livroId:
 *                     type: integer
 *                     example: 10
 *                   usuarioId:
 *                     type: integer
 *                     example: 5
 *                   quantidadeLivro:
 *                     type: integer
 *                     example: 2
 *                   motivoRetirada:
 *                     type: string
 *                     example: "Estudo para prova"
 *                   contato:
 *                     type: string
 *                     example: "(81) 99999-0000"
 *                   dataRetirada:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-09-26T15:00:00Z
 *                   dataRetorno:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: null
 */
router.get("/", autenticarJWT, RetiradaController.listarTodas);

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
 *               - livroId
 *               - usuarioId
 *               - quantidadeLivro
 *               - motivoRetirada
 *               - contato
 *             properties:
 *               livroId:
 *                 type: integer
 *                 example: 10
 *               usuarioId:
 *                 type: integer
 *                 example: 5
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
 *               type: object
 *               properties:
 *                 retiradaId:
 *                   type: integer
 *                   example: 1
 *                 livroId:
 *                   type: integer
 *                   example: 10
 *                 usuarioId:
 *                   type: integer
 *                   example: 5
 *                 quantidadeLivro:
 *                   type: integer
 *                   example: 1
 *                 motivoRetirada:
 *                   type: string
 *                   example: "Leitura para pesquisa"
 *                 contato:
 *                   type: string
 *                   example: "(81) 91234-5678"
 *                 dataRetirada:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-26T15:00:00Z
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
 *         description: ID da retirada
 *     responses:
 *       200:
 *         description: Devolução registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 retiradaId:
 *                   type: integer
 *                   example: 1
 *                 livroId:
 *                   type: integer
 *                   example: 10
 *                 usuarioId:
 *                   type: integer
 *                   example: 5
 *                 dataRetirada:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-20T15:00:00Z
 *                 dataRetorno:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-26T15:00:00Z
 *       404:
 *         description: Retirada não encontrada
 */
router.put("/:id/devolver", autenticarJWT, RetiradaController.registrarDevolucao);

export default router;
