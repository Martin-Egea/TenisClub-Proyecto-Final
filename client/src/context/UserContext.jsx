/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { registroDeUsuario } from "../api/user.api";

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

  return (
    <UserContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
