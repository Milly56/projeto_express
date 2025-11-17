import { Router } from "express";
import { LivroController } from "../controller/LivroController";
import { autenticarJWT } from "../middleware/authMiddleware";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Livros
 *   description: Operações relacionadas aos livros (necessário Bearer Token)
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
 * /api/livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get("/", autenticarJWT, LivroController.listarTodos);

/**
 * @openapi
 * /api/livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - categoria
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "O Senhor dos Anéis"
 *               categoria:
 *                 type: string
 *                 example: "Fantasia"
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */
router.post("/", autenticarJWT, LivroController.criar);

/**
 * @openapi
 * /api/livros/titulo/{titulo}:
 *   get:
 *     summary: Busca um livro pelo título
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: titulo
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Título do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get("/titulo/:titulo", autenticarJWT, LivroController.buscarPorTitulo);

/**
 * @openapi
 * /api/livros/titulo/{titulo}:
 *   put:
 *     summary: Atualiza um livro com base no título
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: titulo
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 */
router.put("/titulo/:titulo", autenticarJWT, LivroController.atualizar);

/**
 * @openapi
 * /api/livros:
 *   delete:
 *     summary: Remove um livro com base no título e quantidade
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - quantidade
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "O Senhor dos Anéis"
 *               quantidade:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete("/", autenticarJWT, LivroController.deletar);

export default router;
