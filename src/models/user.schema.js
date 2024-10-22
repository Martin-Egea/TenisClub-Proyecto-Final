import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const UserSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  fecha_nacimiento: { type: Date, required: true },
  domicilio: { type: String, required: true, trim: true },
  localidad: { type: String, required: true, trim: true },
  telefono: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  rol_usuario: { type: Number, default: 0 },
  password: { type: String, required: true },
  socio_activo: { type: Boolean, default: false },
});

const User = models.user || model("user", UserSchema);

export default User;
