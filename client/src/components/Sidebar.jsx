/* eslint-disable react/prop-types */
import { ChevronFirst, ChevronLast, MoreVertical, User } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useUser } from "../context/UserContext.jsx";

const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    logout();
    setIsOpen(false);
  };

  return (
    <aside className="h-screen w-max float-left sticky top-0 mr-4 animate-fade-right z-50">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="./LogoTenis.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 flex-col px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {/* <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          /> */}
          <User className="w-10 h-10 rounded-md bg-slate-200" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">
                {user ? user.nombre : "John Doe"}
              </h4>
              <span className="text-xs text-gray-600">
                {user ? user.email : "John Doe"}
              </span>
            </div>
            <div className="">
              <button
                onClick={toggleMenu}
                className="px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <MoreVertical size={20} />
              </button>
              {isOpen && (
                <div className="absolute right-0 bottom-16 m-2 w-48 bg-white border-orange-200 border rounded shadow-xl animate-fade-up animate-duration-500">
                  <button
                    onClick={handleLogout}
                    className="block font-semibold w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 "
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-700"
              : "hover:bg-indigo-50 text-gray-600"
          }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0 max-h-6"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-orange-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 w-auto
            bg-orange-100 text-orange-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
