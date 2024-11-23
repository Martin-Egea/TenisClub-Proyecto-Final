import Reserva from "../models/reservas.schema.js";

export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate({
      path: "id_cancha id_usuario",
      select: "nombre nombre apellido",
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

export const obtenerReservasPorCancha = async (req, res) => {
  const { id_cancha } = req.params;
  console.log(id_cancha);
  try {
    const reservas = await Reserva.find({ id_cancha }).populate({
      path: "id_cancha id_usuario",
      select: "nombre nombre apellido",
    });
    if (reservas.length > 0) {
      res.status(200).json(reservas);
    } else {
      res.status(404).json({ error: "No existen reservas para esta cancha" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas", error });
  }
};

export const nuevaReserva = async (req, res) => {
  const { id_cancha, fecha, hora_inicio, id_usuario } = req.body;

  //console.log(id_cancha, fecha, hora_inicio, id_usuario);
  try {
    // Verificar si el horario ya esta reservado
    const reservaExistente = await Reserva.findOne({
      id_cancha,
      fecha,
      hora_inicio,
    });

    // Si la reserva ya existe, devolver un error
    if (reservaExistente) {
      return res.status(400).json({ error: "El horario ya está reservado" });
    }

    // Si la reserva no existe, crear una nueva
    const nuevaReserva = new Reserva({
      id_cancha,
      fecha,
      hora_inicio,
      id_usuario,
    });

    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva", error });
  }
};

export const eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findByIdAndDelete(id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(204).json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva", error });
  }
};
