import z from "zod";

export const crearCuotaSocialSchema = z.object({
  importe: z.string({
    required_error: "El importe es obligatorio",
  }),
  mes: z.string({
    required_error: "El mes es obligatorio",
  }),
});
