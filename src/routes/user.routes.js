import { Router } from "express";
import {
  allUsers,
  login,
  logout,
  profile,
  register,
  verifyToken,
  updateUser,
  findUser,
} from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/user.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/users", allUsers);
router.put("/users/:id", authRequired, updateUser);
router.get("/findUser/:id", authRequired, findUser);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

export default router;
