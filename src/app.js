import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import cuotaSocialRoutes from "./routes/cuotaSocial.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", cuotaSocialRoutes);

export default app;
