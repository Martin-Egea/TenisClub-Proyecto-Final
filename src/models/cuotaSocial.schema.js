import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CuotaSocialSchema = new Schema(
  {
    socio: { type: Schema.Types.ObjectId, ref: "user", required: true },
    importe: { type: Number, required: true },
    mes: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CuotaSocial =
  models.cuotaSocial || model("cuotaSocial", CuotaSocialSchema);

export default CuotaSocial;
