import User from "../models/user.schema.js";
import { createAccessToken } from "../libs/jwt.js";

export const loginOrRegister = async (req, res) => {
  const { googleId, nombre, apellido, email } = req.body;

  try {
    //consulto si el id de Google existe en la BD y si es asi creo el token de validación
    const userGoogleIdFound = await User.findOne({ googleId });
    if (userGoogleIdFound) {
      const token = await createAccessToken({ id: userGoogleIdFound._id });

      res.cookie("token", token);
      res.json({
        id: userGoogleIdFound._id,
        nombre: userGoogleIdFound.nombre,
        email: userGoogleIdFound.email,
      });
      return;
    }

    //en caso que no encuentre el GoogleId en la BD creo un nuevo usuario
    const newUser = new User({
      googleId,
      nombre,
      apellido,
      email,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
