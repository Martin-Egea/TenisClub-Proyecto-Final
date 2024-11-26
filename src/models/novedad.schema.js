import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const NovedadSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: false },
  clicks: { type: Number, default: 0 },
});

const Novedad = models.novedad || model("novedad", NovedadSchema);

export default Novedad;
