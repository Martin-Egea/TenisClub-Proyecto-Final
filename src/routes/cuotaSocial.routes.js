import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  obtenerCuotasSociales,
  crearCuotaSocial,
  obtenerCuotaSocialPorId,
  actualizarCuotaSocial,
  eliminarCuotaSocial,
} from "../controllers/cuotaSocial.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { crearCuotaSocialSchema } from "../schemas/cuotaSocial.schema.js";

const router = Router();

router.get("/cuotaSocial", authRequired, obtenerCuotasSociales);
router.post(
  "/cuotaSocial",
  authRequired,
  validateSchema(crearCuotaSocialSchema),
  crearCuotaSocial
);
router.get("/cuotaSocial/:id", authRequired, obtenerCuotaSocialPorId);
router.delete("/cuotaSocial/:id", authRequired, eliminarCuotaSocial);
router.put("/cuotaSocial/:id", authRequired, actualizarCuotaSocial);

export default router;
