import { Router } from "express";
import { RetiradaController } from "../controller/RetiradaController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Retiradas
 *   description: Endpoints para gerenciar retiradas de livros
 */

/**
 * @openapi
 * /api/retiradas:
 *   get:
 *     summary: Lista todas as retiradas
 *     tags: [Retiradas]
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
 *                   usuarioId:
 *                     type: integer
 *                     example: 5
 *                   livroId:
 *                     type: integer
 *                     example: 3
 *                   quantidadeLivro:
 *                     type: integer
 *                     example: 2
 *                   motivoRetirada:
 *                     type: string
 *                     example: Pesquisa escolar
 *                   contato:
 *                     type: string
 *                     example: joao@email.com
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
router.get("/", RetiradaController.listarTodas);

/**
 * @openapi
 * /api/retiradas:
 *   post:
 *     summary: Registra uma nova retirada
 *     tags: [Retiradas]
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
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 5
 *               livroId:
 *                 type: integer
 *                 example: 3
 *               quantidadeLivro:
 *                 type: integer
 *                 example: 1
 *               motivoRetirada:
 *                 type: string
 *                 example: Leitura recreativa
 *               contato:
 *                 type: string
 *                 example: joao@email.com
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
 *                 usuarioId:
 *                   type: integer
 *                   example: 5
 *                 livroId:
 *                   type: integer
 *                   example: 3
 *                 quantidadeLivro:
 *                   type: integer
 *                   example: 1
 *                 motivoRetirada:
 *                   type: string
 *                   example: Leitura recreativa
 *                 contato:
 *                   type: string
 *                   example: joao@email.com
 *                 dataRetirada:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-09-26T15:00:00Z
 */
router.post("/", RetiradaController.criar);

/**
 * @openapi
 * /api/retiradas/{id}/devolver:
 *   put:
 *     summary: Registra a devolução de uma retirada
 *     tags: [Retiradas]
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
 *                 usuarioId:
 *                   type: integer
 *                   example: 5
 *                 livroId:
 *                   type: integer
 *                   example: 3
 *                 quantidadeLivro:
 *                   type: integer
 *                   example: 2
 *                 motivoRetirada:
 *                   type: string
 *                   example: Pesquisa escolar
 *                 contato:
 *                   type: string
 *                   example: joao@email.com
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
router.put("/:id/devolver", RetiradaController.registrarDevolucao);

export default router;
