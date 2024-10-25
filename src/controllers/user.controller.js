import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

//Obtener todos los usuarios
export const allUsers = async (req, res) => {
  try {
    const result = await findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json();
  }
};

//registrar nuevo usuario.
export const register = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    domicilio,
    localidad,
    telefono,
    email,
    password,
  } = req.body;

  try {
    const hashedPass = bcrypt.hashSync(password, 8);

    const newUser = new User({
      nombre,
      apellido,
      fecha_nacimiento,
      domicilio,
      localidad,
      telefono,
      email,
      password: hashedPass,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const matchedPass = bcrypt.compare(password, userFound.password);
    if (!matchedPass)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.status(200).json({
      id: userFound._id,
      nombre: userFound.nombre,
      contraseña: userFound.apellido,
      token: token,
      rol_usuario: userFound.rol_usuario,
      socio_activo: userFound.socio_activo,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada" });
};

//Obtener información del usuario
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  return res.status(200).json({
    id: userFound._id,
    nombre: userFound.nombre,
    apellido: userFound.apellido,
    fecha_nacimiento: userFound.fecha_nacimiento,
    domicilio: userFound.domicilio,
    localidad: userFound.localidad,
    telefono: userFound.telefono,
    email: userFound.email,
    rol_usuario: userFound.rol_usuario,
    socio_activo: userFound.socio_activo,
  });
};
