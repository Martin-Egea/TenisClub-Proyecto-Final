import { useForm } from "react-hook-form";
import { registroDeUsuario } from "../api/user.api.js";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await registroDeUsuario(data);
    console.log(res);
  };

  return (
    <div className="max-w-md mx-auto bg-white my-3 p-6 shadow-2xl rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center">
        Registro de Usuario
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
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
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
