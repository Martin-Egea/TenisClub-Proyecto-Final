import axios from "axios";
import { API } from "./api.js";

const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default instance;
