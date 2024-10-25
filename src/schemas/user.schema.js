import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio",
  }),
  apellido: z.string({
    required_error: "El apellido es obligatorio",
  }),
  fecha_nacimiento: z.string({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  domicilio: z.string({
    required_error: "El domicilio es obligatorio",
  }),
  localidad: z.string({
    required_error: "La localidad es obligatoria",
  }),
  telefono: z.string({
    required_error: "El teléfono es obligatorio",
  }),
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "El email debe ser válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "El email debe ser válido",
    }),
  password: z.string({
    required_error: "La contraseña es obligatoria",
  }),
});
