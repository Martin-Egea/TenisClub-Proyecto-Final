import { useForm } from "react-hook-form";
//import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signInErrors } = useUser();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <div className="bg-gray-600 flex justify-center items-center h-screen ">
      <div className="max-w-md mx-auto bg-white my-3 p-6 shadow-2xl rounded-lg min-w-[300px]">
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
          <div className="text-center pb-3">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Iniciar Sesión
            </button>
          </div>
          {/* navegacion a la pagina de register o recuperar contraseña */}
          <div className="grid grid-cols-1 gap-1">
            <Link to="/register" className="hover:text-indigo-500">
              Registrarse
            </Link>
            <Link to="/" className="hover:text-indigo-500">
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
