import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const router = Router();

// GET /api/livros - Listar todos os livros
router.get("/", LivroController.listarTodos);

// POST /api/livros - Criar um novo livro
router.post("/", LivroController.criar);

// GET /api/livros/:id - Buscar livro por ID
router.get("/:id", LivroController.buscarPorId);

export default router;
