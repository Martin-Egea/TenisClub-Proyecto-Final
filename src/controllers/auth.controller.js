import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.json(userSaved);
  } catch (error) {
    res.status(400).json();
  }
};

export const login = (req, res) => res.send("login");
