import { Router } from "express";
import { RetiradaController } from "../controller/RetiradaController";

const router = Router();

// GET /api/retiradas - Listar todas as retiradas
router.get("/", RetiradaController.listarTodas);

// POST /api/retiradas - Criar nova retirada
router.post("/", RetiradaController.criar);

// PUT /api/retiradas/:id/devolver - Registrar devolução
router.put("/:id/devolver", RetiradaController.registrarDevolucao);

export default router;
