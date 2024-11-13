import axios from "./axios.js";

export const loginOrRegister = async (user) => axios.post(`/google/auth`, user);
