/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import {
  registroDeUsuario,
  loginDeUsuario,
  verifyUserToken,
  obtenerUsuarios,
  actualizarUsuario,
  buscarUsuarioXid,
} from "../api/user.api";
import {
  obtenerCuotasSociales,
  crearCuotaSocial,
  eliminarCuotaSocial,
} from "../api/cuotaSocial.api.js";
import { loginOrRegister } from "../api/googleAuth.api.js";
import {
  crearNovedad,
  obtenerNovedades,
  eliminarNovedad,
  contarClicks,
} from "../api/novedad.api.js";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro de un UserProvider");
  }
  return context;
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [cuotasSociales, setCuotasSociales] = useState([]);
  const [novedades, setNovedades] = useState([]);

  const googleLoginOrRegister = async (user) => {
    try {
      const res = await loginOrRegister(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (user) => {
    try {
      const res = await registroDeUsuario(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginDeUsuario(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
  };

  //obtener todos los usuarios
  const getAllUsers = async () => {
    try {
      const res = await obtenerUsuarios();
      setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //buscar un usuario por id
  const findUserById = async (id) => {
    try {
      const res = await buscarUsuarioXid(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //obtener todas las cuotas sociales
  const getAllCuotasSociales = async () => {
    try {
      const res = await obtenerCuotasSociales();
      setCuotasSociales(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //crear una cuosa social nueva!!!!
  const crearInformePago = async (pago) => {
    await crearCuotaSocial(pago);
  };

  //actualizar un usuario
  const updateUser = async (user) => {
    try {
      const res = await actualizarUsuario(user);
      setUser(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //eliminar una cuota social
  const deleteCuotaSocial = async (id) => {
    await eliminarCuotaSocial(id);
    getAllCuotasSociales();
  };

  const createNovedad = async (novedad) => {
    await crearNovedad(novedad);
    obtenerTodasLasNovedades();
  };

  const obtenerTodasLasNovedades = async () => {
    const res = await obtenerNovedades();
    setNovedades(res.data);
  };

  const deleteNovedad = async (id) => {
    await eliminarNovedad(id);
    novedades.filter((novedad) => novedad._id !== id);
    obtenerTodasLasNovedades();
  };

  const contarVistasNovedades = async (id) => {
    await contarClicks(id);
    obtenerTodasLasNovedades();
  };

  //limpiar los errores de validación
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  // comprobar si el usuario está logueado
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      // comprobar si hay token
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      // comprobar si el token es válido
      try {
        // comprobar si el token es válido en el Backend!
        const res = await verifyUserToken(cookies.token);

        if (!res.data) return setIsAuthenticated(false);

        // si el token es válido
        setIsAuthenticated(true);
        setUser(res.data);
        getAllUsers();
        getAllCuotasSociales();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        googleLoginOrRegister,
        signUp,
        signIn,
        logout,
        crearInformePago,
        loading,
        user,
        isAuthenticated,
        errors,
        allUsers,
        cuotasSociales,
        novedades,
        getAllUsers,
        findUserById,
        updateUser,
        setCuotasSociales,
        getAllCuotasSociales,
        deleteCuotaSocial,
        createNovedad,
        obtenerTodasLasNovedades,
        deleteNovedad,
        contarVistasNovedades,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
