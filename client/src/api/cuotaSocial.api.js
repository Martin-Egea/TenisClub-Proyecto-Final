import axios from "./axios.js";

export const obtenerCuotasSociales = async () => axios.get(`/cuotaSocial`);

export const obtenerCuotaSocialXid = async (id) =>
  axios.get(`/cuotaSocial/${id}`);

export const crearCuotaSocial = async (cuotaSocial) =>
  axios.post(`/cuotaSocial`, cuotaSocial);

export const actualizarCuotaSocial = async (cuotaSocial) =>
  axios.put(`/cuotaSocial/${cuotaSocial._id}`, cuotaSocial);

export const eliminarCuotaSocial = async (id) =>
  axios.delete(`/cuotaSocial/${id}`);
