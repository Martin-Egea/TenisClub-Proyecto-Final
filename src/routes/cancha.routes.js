import { Router } from "express";
import {
  crearCancha,
  obtenerCanchas,
  eliminarCancha,
} from "../controllers/cancha.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/obtenerCanchas", authRequired, obtenerCanchas);
router.post("/crearCancha", authRequired, crearCancha);
router.delete("/eliminarCancha/:id", authRequired, eliminarCancha);

export default router;
