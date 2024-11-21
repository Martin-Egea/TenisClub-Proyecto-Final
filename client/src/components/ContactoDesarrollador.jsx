/* eslint-disable react/prop-types */
import { BriefcaseBusiness, Github, Mail, Smartphone } from "lucide-react";

export const DeveloperContact = ({ active }) => {
  return (
    <div
      className={`flex justify-center items-center animate-fade-left
        ${active ? "" : "hidden"} `}
    >
      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-20 shadow-xl rounded-lg border border-gray-400">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Contacto del Desarrollador
          </h2>
          <p className="mt-2 text-gray-900">
            Si tienes alguna pregunta, aquí tienes mi información.
          </p>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center space-x-4">
            <span className="p-2 bg-blue-100 bg-opacity-50 text-blue-500 rounded-full">
              <Mail />
            </span>
            <span className="text-gray-700 font-semibold">
              Correo:{" "}
              <a
                href="mailto:mar.egea18@gmail.com"
                className="text-blue-600 hover:underline"
              >
                mar.egea18@gmail.com
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="p-2 bg-green-100 bg-opacity-50 text-green-500 rounded-full">
              <Smartphone />
            </span>
            <span className="text-gray-700 font-semibold">
              Teléfono:{" "}
              <a
                href="tel:+123456789"
                className="text-blue-600 hover:underline"
              >
                +123 456 789
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="p-2 bg-purple-100 bg-opacity-50 text-purple-500 rounded-full">
              <BriefcaseBusiness />
            </span>
            <span className="text-gray-700 font-semibold">
              Portafolio:{" "}
              <a
                href="https://www.portafolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.portafolio.com
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="p-2 bg-gray-100 bg-opacity-50 text-gray-500 rounded-full">
              <Github />
            </span>
            <span className="text-gray-700 font-semibold">
              Repositorio:{" "}
              <a
                href="https://github.com/Martin-Egea"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/Martin-Egea
              </a>
            </span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">
            Desarrollado por Ángel Martín Egea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperContact;
