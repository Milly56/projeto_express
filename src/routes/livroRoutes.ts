import { Router } from "express";
import { LivroController } from "../controller/LivroController";
import { autenticarJWT } from "../middleware/authMiddleware";

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
 *     security:
 *       - bearerAuth: []
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
router.get("/",autenticarJWT,LivroController.listarTodos);

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
router.post("/",autenticarJWT,LivroController.criar);

/**
 * @openapi
 * /api/livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
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
router.get("/:id",autenticarJWT,LivroController.buscarPorId);

/**
 * @openapi
 * /api/livros/{id}:
 *   delete:
 *     summary: Deleta um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser deletado
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Livro deletado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     livroId:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: O Hobbit
 *                     categoria:
 *                       type: string
 *                       example: Fantasia
 *                     quantidade:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ID deve ser um número válido
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Livro não encontrado
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor
 */
router.delete("/:id",autenticarJWT,LivroController.deletar);

/**
 * @openapi
 * /api/livros/{id}:
 *   put:
 *     summary: Atualiza um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: O Silmarillion
 *               autor:
 *                 type: string
 *                 example: J. R. R. Tolkien
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: ID inválido ou dados incorretos
 *       404:
 *         description: Livro não encontrado
 */
<<<<<<< Updated upstream
router.put("/:id", LivroController.atualizar);
=======
router.put("/:id",autenticarJWT,LivroController.atualizar);

export default router;
>>>>>>> Stashed changes
