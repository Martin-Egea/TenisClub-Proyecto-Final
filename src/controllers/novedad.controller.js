import Novedad from "../models/novedad.schema.js";

export const getNovedades = async (req, res) => {
  const novedades = await Novedad.find();
  res.json(novedades);
};

export const contarClicks = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const novedad = await Novedad.findById(id);
    if (!novedad) {
      return res.status(404).json({ error: "Novedad no encontrada" });
    }
    novedad.clicks += 1;
    await novedad.save();
    res.status(200).json(novedad);
  } catch (error) {
    res.status(500).json({ error: "Error al contar los clicks", error });
  }
};

export const nuevaNovedad = async (req, res) => {
  const { titulo, descripcion, imagen } = req.body;
  const validacion = validar(titulo, descripcion, imagen, "Y");
  if (validacion == "") {
    const novedad = new Novedad({ titulo, descripcion, imagen });
    await novedad.save();
    res.status(200).json("Novedad creada: " + novedad);
  } else {
    res.status(400).json({ status: false, error: validacion });
  }
  try {
  } catch (error) {
    res.status(500).json({ error: "Error al crear la novedad", error });
  }
};

export const eliminarNovedad = async (req, res) => {
  const { id } = req.params;
  try {
    const novedad = await Novedad.findByIdAndDelete(id);
    if (!novedad) {
      return res.status(404).json({ error: "Novedad no encontrada" });
    }
    res.status(204).json({ message: "Novedad eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la novedad", error });
  }
};

//Validaciones para la nueva novedad
const validar = (titulo, descripcion, imagen, sevalida) => {
  const errors = [];

  if (titulo === undefined || titulo.trim() === "") {
    errors.push("El título es obligatorio");
  }
  if (descripcion === undefined || descripcion.trim() === "") {
    errors.push("La descripción es obligatoria");
  }
  if (sevalida === "Y" && imagen === undefined) {
    errors.push("La imagen tiene que ser en formato jpeg o png");
  } else {
    if (errors != "") {
      fs.unlinkSync("./client/public/uploads/" + imagen.filename);
    }
  }
  return errors;
};
