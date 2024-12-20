import axios from "./axios.js";

export const enviarMail = async (email, subject, message) =>
  axios.post(`/enviarMail`, { email, subject, message });
