import z from "zod";

export const crearCuotaSocialSchema = z.object({
  importe: z.number({
    required_error: "El importe es obligatorio",
  }),
  mes: z.number({
    required_error: "El mes es obligatorio",
  }),
});
