import axios from "./axios.js";

export const obtenerReservas = async () => axios.get(`/obtenerReservas`);

export const obtenerReservasPorCancha = async (id_cancha) =>
  axios.get(`/obtenerReservasPorCancha/${id_cancha}`);

export const obtenerReservasPorFechaEIdCancha = async (fechaYCancha) =>
  axios.post(`/obtenerReservasXFechaYCancha/`, fechaYCancha);

export const nuevaReserva = async (reserva) =>
  axios.post(`/nuevaReserva`, reserva);

export const eliminarReserva = async (id) =>
  axios.delete(`/eliminarReserva/${id}`);

export const obtenerReservasPorYear = async (year) =>
  axios.get(`/obtenerReservasPorYear/${year}`);
