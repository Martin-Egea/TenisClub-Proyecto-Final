import Cancha from "../models/canchas.schema.js";

export const obtenerCanchas = async (req, res) => {
  const canchas = await Cancha.find();
  res.json(canchas);
};

export const crearCancha = async (req, res) => {
  const { nombre } = req.body;
  const cancha = new Cancha({ nombre });
  await cancha.save();
  res.json(cancha);
};

export const eliminarCancha = async (req, res) => {
  const id = req.params.id;
  const cancha = await Cancha.findByIdAndDelete(id);
  if (!cancha) return res.status(404).json({ message: "Cancha no encontrada" });
  res.status(204).json({ message: "Cancha eliminada" });
};
