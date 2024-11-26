import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import cuotaSocialRoutes from "./routes/cuotaSocial.routes.js";
import googleAuthRoutes from "./routes/googleAuth.routes.js";
import canchasRoutes from "./routes/cancha.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import novedadRoutes from "./routes/novedad.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", cuotaSocialRoutes);
app.use("/api", googleAuthRoutes);
app.use("/api", canchasRoutes);
app.use("/api", reservaRoutes);
app.use("/api", novedadRoutes);

export default app;
