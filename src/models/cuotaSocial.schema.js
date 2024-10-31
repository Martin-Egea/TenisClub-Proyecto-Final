import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CuotaSocialSchema = new Schema(
  {
    socio: { type: Schema.Types.ObjectId, ref: "user", required: true },
    importe: { type: String, required: true },
    mes: { type: String, required: true },
    revisado: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CuotaSocial =
  models.cuotaSocial || model("cuotaSocial", CuotaSocialSchema);

export default CuotaSocial;
