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
 * /api/retiradas:
 *   get:
 *     summary: Lista todas as retiradas de livros
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de retiradas retornada com sucesso
 */
router.get("/", autenticarJWT, RetiradaController.listarTodas);

/**
 * @openapi
 * /api/retiradas/buscar:
 *   get:
 *     summary: Obtém uma retirada específica pelo nome do usuário e o título do livro
 *     tags: [Retiradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nomeUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *       - in: query
 *         name: tituloLivro
 *         required: true
 *         schema:
 *           type: string
 *         description: Título do livro
 *     responses:
 *       200:
 *         description: Retirada encontrada
 *       404:
 *         description: Retirada não encontrada
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
 *                 example: "Maria Silva"
 *               tituloLivro:
 *                 type: string
 *                 example: "JavaScript Avançado"
 *               quantidadeLivro:
 *                 type: integer
 *                 example: 1
 *               motivoRetirada:
 *                 type: string
 *                 example: "Leitura para estudo"
 *               contato:
 *                 type: string
 *                 example: "(81) 91234-5678"
 *     responses:
 *       201:
 *         description: Retirada registrada com sucesso
 */
router.post("/", autenticarJWT, RetiradaController.criar);

/**
 * @openapi
 * /api/retiradas/devolver:
 *   put:
 *     summary: Registra devolução com nome do usuário e título do livro
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
 *     summary: Deleta uma retirada com nome do usuário e título do livro
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
