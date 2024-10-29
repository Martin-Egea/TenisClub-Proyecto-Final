/* eslint-disable react/prop-types */
export function CuotaSocios({ active }) {
  return (
    <div
      className={`flex justify-center items-center 
    ${active ? "" : "hidden"} `}
    >
      Cuota Socios
    </div>
  );
}

export default CuotaSocios;
