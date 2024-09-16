import {Router}  from "express";
import MedicoController from "../controller/medicoController";

const router = Router();

router.post('/registrar', MedicoController.registrar);
router.post('/login', MedicoController.login);

export default router;