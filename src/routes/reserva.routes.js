import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  obtenerReservas,
  obtenerReservasPorCancha,
  nuevaReserva,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/obtenerReservas", authRequired, obtenerReservas);
router.get(
  "/obtenerReservasPorCancha/:id_cancha",
  authRequired,
  obtenerReservasPorCancha
);
router.post("/nuevaReserva", authRequired, nuevaReserva);

export default router;
