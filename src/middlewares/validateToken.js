import jwt from "jsonwebtoken";
import "dotenv/config";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    //pisa el request con el decodificado para que que la siguiente función pueda usarlo
    req.user = decoded;

    next();
  });
};
