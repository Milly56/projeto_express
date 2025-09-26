import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Livros
 *   description: Endpoints para gerenciar livros
 */

/**
 * @openapi
 * /api/livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: O Senhor dos Anéis
 */
router.get("/", LivroController.listarTodos);

/**
 * @openapi
 * /api/livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: O Hobbit
 *               autor:
 *                 type: string
 *                 example: J. R. R. Tolkien
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: O Hobbit
 *                 autor:
 *                   type: string
 *                   example: J. R. R. Tolkien
 */
router.post("/", LivroController.criar);

/**
 * @openapi
 * /api/livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: O Hobbit
 *                 autor:
 *                   type: string
 *                   example: J. R. R. Tolkien
 *       404:
 *         description: Livro não encontrado
 */
router.get("/:id", LivroController.buscarPorId);

export default router;
