/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  obtenerCanchas,
  crearCancha,
  eliminarCancha,
} from "@/api/cancha.api.js";
import {
  obtenerReservas,
  obtenerReservasPorCancha,
  obtenerReservasPorFechaEIdCancha,
  obtenerReservasPorYear,
  nuevaReserva,
  eliminarReserva,
} from "@/api/reserva.api.js";

export const ReservaContext = createContext();

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error("useReserva debe estar dentro de un ReservaProvider");
  }
  return context;
};

export const ReservaProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const obtenerTodasLasCanchas = async () => {
    try {
      const res = await obtenerCanchas();
      setCanchas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearNuevaCancha = async (cancha) => {
    try {
      const res = await crearCancha(cancha);
      setCanchas([...canchas, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCanchaXId = async (id) => {
    try {
      await eliminarCancha(id);
      setCanchas(canchas.filter((cancha) => cancha._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTodasLasReservas = async () => {
    try {
      const res = await obtenerReservas();
      setReservas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTodasLasReservasPorCancha = async (id) => {
    try {
      const res = await obtenerReservasPorCancha(id);
      setReservas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerReservasXFechaYCancha = async (fechaYcancha) => {
    try {
      const res = await obtenerReservasPorFechaEIdCancha(fechaYcancha);
      console.log(res);
      setReservas(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTodasLasReservasDelAnio = async (year) => {
    try {
      const res = await obtenerReservasPorYear(year);
      setReservas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearNuevaReserva = async (reserva) => {
    try {
      const res = await nuevaReserva(reserva);
      setReservas([...reservas, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUnaReserva = async (id) => {
    try {
      await eliminarReserva(id);
      setReservas(reservas.filter((reserva) => reserva._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReservaContext.Provider
      value={{
        obtenerTodasLasCanchas,
        crearNuevaCancha,
        eliminarCanchaXId,
        obtenerTodasLasReservas,
        obtenerTodasLasReservasPorCancha,
        obtenerReservasXFechaYCancha,
        crearNuevaReserva,
        eliminarUnaReserva,
        obtenerTodasLasReservasDelAnio,
        reservas,
        canchas,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
};
