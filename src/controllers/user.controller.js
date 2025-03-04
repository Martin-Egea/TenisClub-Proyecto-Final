import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

//Obtener todos los usuarios
export const allUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
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
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El email ya esta registrado"]);

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
    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const matchedPass = bcrypt.compareSync(password, userFound.password);
    console.log(matchedPass);
    if (!matchedPass) return res.status(400).json(["Contraseña incorrecta"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.status(200).json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      fecha_nacimiento: userFound.fecha_nacimiento,
      domicilio: userFound.domicilio,
      localidad: userFound.localidad,
      telefono: userFound.telefono,
      email: userFound.email,
      contraseña: userFound.password,
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

export const findUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userFound = await User.findById(id);

    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    res.status(200).json(userFound);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

//Actualizar usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    domicilio,
    localidad,
    telefono,
    email,
    socio_activo,
    password,
  } = req.body;

  //console.log(req.body);

  try {
    const userFound = await User.findById(id);
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const fechaNacimientoString = fecha_nacimiento;
    const [dia, mes, anio] = fechaNacimientoString.split("/").map(Number);
    const FechaNacimientoDate = new Date(anio, mes - 1, dia);
    console.log(fechaNacimientoString);

    userFound.nombre = nombre;
    userFound.apellido = apellido;
    userFound.fecha_nacimiento = FechaNacimientoDate;
    userFound.domicilio = domicilio;
    userFound.localidad = localidad;
    userFound.telefono = telefono;
    userFound.email = email;
    userFound.socio_activo = socio_activo;
    if (
      password &&
      password !== "" &&
      password !== undefined &&
      password !== null &&
      password.length > 7
    ) {
      userFound.password = bcrypt.hashSync(password, 8);
    }

    const userUpdated = await userFound.save();
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(decoded.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
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
  });
};
