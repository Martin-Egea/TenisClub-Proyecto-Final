import axios from "./axios.js";

export const obtenerCanchas = async () => axios.get(`/obtenerCanchas`);

export const crearCancha = async (cancha) => axios.post(`/crearCancha`, cancha);

export const eliminarCancha = async (id) =>
  axios.delete(`/eliminarCancha/${id}`);
