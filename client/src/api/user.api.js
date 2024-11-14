import axios from "./axios.js";

export const registroDeUsuario = async (user) => axios.post(`/register`, user);

export const loginDeUsuario = async (user) => axios.post(`/login`, user);

export const verifyUserToken = async () => axios.get(`/verify`);

export const obtenerUsuarios = async () => axios.get(`/users`);

export const buscarUsuarioXid = async (id) => axios.get(`/findUser/${id}`);

export const actualizarUsuario = async (user) =>
  axios.put(`/users/${user._id}`, user);
