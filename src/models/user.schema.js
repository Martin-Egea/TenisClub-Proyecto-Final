import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const UserSchema = new Schema(
  {
    googleId: { type: String, required: false },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    fecha_nacimiento: { type: Date, required: false },
    domicilio: { type: String, required: false, trim: true },
    localidad: { type: String, required: false, trim: true },
    telefono: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    rol_usuario: { type: Number, default: 0 },
    password: { type: String, required: false },
    socio_activo: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = models.user || model("user", UserSchema);

export default User;
