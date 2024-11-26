import axios from "./axios.js";

export const obtenerNovedades = async () => axios.get(`/obtenerNovedades`);

export const crearNovedad = async (novedad) =>
  axios.post(`/crearNovedad`, novedad, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const eliminarNovedad = async (id) =>
  axios.delete(`/eliminarNovedad/${id}`);

export const contarClicks = async (id) =>
  axios.put(`/contarVistasNovedades/${id}`);
