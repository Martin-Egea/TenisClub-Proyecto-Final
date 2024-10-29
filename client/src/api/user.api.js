import axios from "./axios.js";

export const registroDeUsuario = async (user) => axios.post(`/register`, user);

export const loginDeUsuario = async (user) => axios.post(`/login`, user);

export const verifyUserToken = async () => axios.get(`/verify`);
