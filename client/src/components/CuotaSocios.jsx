/* eslint-disable react/prop-types */
export function CuotaSocios({ active }) {
  return (
    <div
      className={`flex justify-center items-center 
    ${active ? "" : "hidden"} `}
    >
      Lista de cuotas pagadas
    </div>
  );
}

export default CuotaSocios;
