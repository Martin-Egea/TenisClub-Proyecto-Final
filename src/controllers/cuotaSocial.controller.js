import CuotaSocial from "../models/cuotaSocial.schema.js";

export const obtenerCuotasSociales = async (req, res) => {
  const cuotasSociales = await CuotaSocial.find();
  res.json(cuotasSociales);
};

export const crearCuotaSocial = async (req, res) => {
  const { importe, mes } = req.body;

  const Cuota = new CuotaSocial({ socio: req.user.id, importe, mes });
  await Cuota.save();

  res.json(Cuota);
};

export const obtenerCuotaSocialPorId = async (req, res) => {
  const id = req.params.id;
  const cuotaSocial = await CuotaSocial.findById(id);

  if (!cuotaSocial)
    return res.status(404).json({ message: "Cuota social no encontrada" });

  res.json(cuotaSocial);
};

export const eliminarCuotaSocial = async (req, res) => {
  const id = req.params.id;
  const cuotaSocial = await CuotaSocial.findByIdAndDelete(id);

  if (!cuotaSocial)
    return res.status(404).json({ message: "Cuota social no encontrada" });

  res.status(204).json({ message: "Cuota social eliminada" });
};

export const actualizarCuotaSocial = async (req, res) => {
  const id = req.params.id;
  const { importe, mes, socio, revisado } = req.body;
  const cuotaSocial = await CuotaSocial.findByIdAndUpdate(
    id,
    { importe, mes, socio, revisado },
    { new: true }
  );

  if (!cuotaSocial)
    return res.status(404).json({ message: "Cuota social no encontrada" });

  res.json(cuotaSocial);
};
