/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

export function Payment({ active }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div
      className={`flex justify-center items-center 
    ${active ? "" : "hidden"} `}
    >
      <div className=" flex justify-center ">
        <div className=" bg-white my-3 p-6 shadow-2xl rounded-lg min-w-[300px] w-full max-h-fit">
          <h2 className="text-xl font-bold mb-6 text-center">
            Información de Pago
          </h2>
          <form onSubmit={onSubmit} className="space-y-1 ">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 min-w-56">
                    N° de cuenta:
                  </label>
                  <input
                    type="number"
                    placeholder="ejemplo@ejemplo.com"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                    value="000000310003621571806"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alias:
                  </label>
                  <input
                    type="text"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
                    value="angel.martin.egea"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Precio de cuota social:
                  </label>
                  <input
                    type="text"
                    className="block p-2 border border-gray-300 rounded-md shadow-sm w-24 outline-none"
                    value="$20.000"
                    readOnly
                  />
                </div>

                <hr className="my-3" />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mes:
                  </label>
                  <input
                    {...register("mes", {
                      required: "Seleccione un mes",
                    })}
                    type="month"
                    className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                      errors.mes ? "border-red-500" : ""
                    }`}
                  />
                  {errors.mes && (
                    <span className="text-red-500 text-sm">
                      {errors.mes.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Monto a abonar:
                  </label>
                  <input
                    {...register("importe", {
                      required: "Ingrese el importe a informar!",
                    })}
                    type="number"
                    className={` block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                      errors.importe ? "border-red-500" : ""
                    }`}
                    placeholder="$00.00"
                  />
                  {errors.importe && (
                    <span className="text-red-500 text-sm">
                      {errors.importe.message}
                    </span>
                  )}
                </div>
              </div>
              {/* QR de mercado pago */}
              <div className="rounded-xl min-w-[200px] border p-1">
                <img
                  className="max-h-80"
                  src="https://www.partyplace.com.ar/image/0/0_0-qr%20sin%20costo%20mercado%20pago1.png"
                  alt="QR de Mercado Pago"
                />
              </div>
            </div>
            {/* Botón de enviar */}
            <div className="text-center pb-3">
              <button
                type="submit"
                className="w-5/12 font-bold bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
              >
                Informar Pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
