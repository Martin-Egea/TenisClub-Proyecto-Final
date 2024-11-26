import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNovedades,
  nuevaNovedad,
  eliminarNovedad,
  contarClicks,
} from "../controllers/novedad.controller.js";
import { subirImagen } from "../middlewares/storageImage.js";

const routes = Router();

routes.get("/obtenerNovedades", authRequired, getNovedades);
routes.put("/contarVistasNovedades/:id", authRequired, contarClicks);
routes.post(
  "/crearNovedad",
  authRequired,
  subirImagen.single("imagen"),
  nuevaNovedad
);
routes.delete("/eliminarNovedad/:id", authRequired, eliminarNovedad);

export default routes;
