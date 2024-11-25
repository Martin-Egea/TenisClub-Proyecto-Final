import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  obtenerReservas,
  obtenerReservasPorCancha,
  nuevaReserva,
  eliminarReserva,
  obtenerReservasPorFechaEIdCancha,
  obtenerReservasPorYear,
} from "../controllers/reserva.controller.js";

const router = Router();

router.get("/obtenerReservas", authRequired, obtenerReservas);
router.get(
  "/obtenerReservasPorCancha/:id_cancha",
  authRequired,
  obtenerReservasPorCancha
);
router.post(
  "/obtenerReservasXFechaYCancha/",
  authRequired,
  obtenerReservasPorFechaEIdCancha
);
router.get(
  "/obtenerReservasPorYear/:year",
  authRequired,
  obtenerReservasPorYear
);
router.post("/nuevaReserva", authRequired, nuevaReserva);
router.delete("/eliminarReserva/:id", authRequired, eliminarReserva);

export default router;
