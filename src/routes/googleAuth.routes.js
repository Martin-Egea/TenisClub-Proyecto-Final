import { Router } from "express";
import { loginOrRegister } from "../controllers/googleAuth.controller.js";
import { decodeToken } from "../libs/jwt.js";

const router = Router();

router.post("/google/auth", loginOrRegister);
router.post("/decodeToken", async (req, res) => {
  const token = req.body.token;
  const result = await decodeToken(token);
  res.status(200).json(result);
});

export default router;
