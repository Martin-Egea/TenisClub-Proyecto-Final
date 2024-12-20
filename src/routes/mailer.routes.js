import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { transporter } from "../helpers/mailer.js";

const router = Router();

router.post("/enviarMail", authRequired, async (req, res) => {
  const { email, subject, message } = req.body;

  await transporter.sendMail({
    from: `Tenis Club Comercio <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    text: message,
  });

  res.status(200).json({ message: "Mail enviado" });
});

export default router;
