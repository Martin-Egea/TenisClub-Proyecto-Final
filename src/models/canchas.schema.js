import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CanchaSchema = new Schema({
  nombre: { type: String, required: true },
});

const Cancha = models.cancha || model("cancha", CanchaSchema);

export default Cancha;
