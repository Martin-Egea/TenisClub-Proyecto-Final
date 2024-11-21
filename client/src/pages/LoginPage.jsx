import { useForm } from "react-hook-form";
//import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signIn,
    errors: signInErrors,
    isAuthenticated,
    getAllCuotasSociales,
    getAllUsers,
    googleLoginOrRegister,
  } = useUser();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
    /* getAllUsers();
    getAllCuotasSociales(); */
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gradient-to-br from-orange-950 via-amber-500 to-orange-950 flex justify-center items-center h-screen ">
      <div className="max-w-md mx-auto bg-white my-3 p-6 shadow-2xl rounded-lg min-w-[350px] animate-fade">
        <h2 className="text-xl font-bold mb-6 text-center">Login de Usuario</h2>

        <form onSubmit={onSubmit} className="space-y-1 ">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "El email no es válido",
                },
              })}
              type="email"
              placeholder="ejemplo@ejemplo.com"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
              type="password"
              placeholder="*************"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Botón de enviar */}
          <div className="text-center pb-3 flex flex-col gap-2 items-center">
            <button
              type="submit"
              className="w-full font-bold bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
            >
              Iniciar Sesión
            </button>
            <h1>o</h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);

                const usuarioGoogle = {
                  googleId: credentialResponse.clientId,
                  email: decoded.email,
                  nombre: decoded.given_name,
                  apellido: decoded.family_name,
                };
                googleLoginOrRegister(usuarioGoogle);
                getAllUsers();
                getAllCuotasSociales();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          {/* navegacion a la pagina de register o recuperar contraseña */}
          <div className="grid grid-cols-1 gap-1">
            <Link to="/register" className="hover:text-orange-500">
              Registrarse
            </Link>
            <Link to="/" className="hover:text-orange-500">
              Recuperar Contraseña
            </Link>
          </div>
          {/* mensajes de errores obtenidos */}
          <div className="text-center text-sm text-gray-500 py-2">
            {signInErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white " key={i}>
                {error}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
