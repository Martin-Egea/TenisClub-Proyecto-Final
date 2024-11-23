import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const ReservaSchema = new Schema(
  {
    id_cancha: { type: Schema.Types.ObjectId, ref: "cancha", required: true },
    id_usuario: { type: Schema.Types.ObjectId, ref: "user", required: true },
    fecha: { type: String, required: true },
    hora_inicio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reserva = models.reserva || model("reserva", ReservaSchema);

export default Reserva;
