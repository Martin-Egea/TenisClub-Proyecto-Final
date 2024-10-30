import axios from "./axios.js";

export const obtenerCuotasSociales = async () => axios.get(`/cuotaSocial`);
