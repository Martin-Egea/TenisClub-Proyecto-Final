import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: userErrors } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    signUp(data);
  };

  return (
    <div className="bg-gradient-to-br from-orange-950 via-amber-500 to-orange-950 flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto bg-white my-3 p-6 shadow-2xl rounded-lg animate-fade">
        <h2 className="text-xl font-bold mb-6 text-center">
          Registro de Usuario
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 grid-cols-1 gap-3"
        >
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register("nombre", { required: "El nombre es obligatorio" })}
              type="text"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.nombre ? "border-red-500" : ""
              }`}
            />
            {errors.nombre && (
              <span className="text-red-500 text-sm">
                {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
              type="text"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.apellido ? "border-red-500" : ""
              }`}
            />
            {errors.apellido && (
              <span className="text-red-500 text-sm">
                {errors.apellido.message}
              </span>
            )}
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              {...register("fecha_nacimiento", {
                required: "La fecha de nacimiento es obligatoria",
              })}
              type="date"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.fecha_nacimiento ? "border-red-500" : ""
              }`}
            />
            {errors.fecha_nacimiento && (
              <span className="text-red-500 text-sm">
                {errors.fecha_nacimiento.message}
              </span>
            )}
          </div>

          {/* Domicilio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Domicilio
            </label>
            <input
              {...register("domicilio", {
                required: "El domicilio es obligatorio",
              })}
              type="text"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.domicilio ? "border-red-500" : ""
              }`}
            />
            {errors.domicilio && (
              <span className="text-red-500 text-sm">
                {errors.domicilio.message}
              </span>
            )}
          </div>

          {/* Localidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Localidad
            </label>
            <input
              {...register("localidad", {
                required: "La localidad es obligatoria",
              })}
              type="text"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.localidad ? "border-red-500" : ""
              }`}
            />
            {errors.localidad && (
              <span className="text-red-500 text-sm">
                {errors.localidad.message}
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              {...register("telefono", {
                required: "El teléfono es obligatorio",
              })}
              type="tel"
              className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.telefono ? "border-red-500" : ""
              }`}
            />
            {errors.telefono && (
              <span className="text-red-500 text-sm">
                {errors.telefono.message}
              </span>
            )}
          </div>

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
          <div className="text-center ">
            <button
              type="submit"
              className="w-full font-bold bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
            >
              Registrar
            </button>
          </div>
          {/* Navegación a la pantalla de login */}
          <div className="text-center mt-3">
            <Link to="/login" className="hover:text-orange-500">
              Iniciar sesión
            </Link>
          </div>
          {/* mensajes de errores obtenidos */}
          <div className="text-center text-sm text-gray-500 py-2">
            {userErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white " key={i}>
                {error}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
