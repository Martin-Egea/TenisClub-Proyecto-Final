import { API } from "./api.js";
import axios from "axios";

export const registroDeUsuario = async (user) =>
  axios.post(`${API}/register`, user);
