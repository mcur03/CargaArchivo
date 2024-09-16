import { Router } from "express";
import PacienteController from "../controller/pacienteController";
import { validateToken } from "../meddleware/medicoMeddleware";

const router = Router();

router.post('/create', validateToken, PacienteController.create);
router.post('/descargar/:id', validateToken, PacienteController.descargar)
router.put('/editar/:id', validateToken, PacienteController.editar)

export default router;