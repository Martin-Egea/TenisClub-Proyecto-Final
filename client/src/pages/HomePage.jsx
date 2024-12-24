import { useEffect, useState } from "react";
import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Payment } from "../components/Payment";
import {
  LifeBuoy,
  Receipt,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  CalendarSearch,
} from "lucide-react";
import CuotaConfirmadaDeSocios from "../components/CuotaConfirmadaDeSocios";
import TablaSocios from "../components/TablaSocios";
import GraficoRegistroSocios from "@/components/GraficoRegistroSocios";
import { useUser } from "@/context/UserContext";
import MiPerfilFormulario from "@/components/MiPerfilFormulario";
import NovedadCard from "@/components/NovedadCard";
import BarraNovedades from "@/components/NovedadAgregar";
import { Toaster } from "@/components/ui/toaster";
import DeveloperContact from "@/components/ContactoDesarrollador";
import { ReservaCanchas } from "@/components/reservas/ReservaCanchas";
import { ReservasDeUsuario } from "@/components/reservas/ReservaDeUsuario";
import { GraficoSociosXmes } from "@/components/recaudacion/GraficoSociosXmes";
import { GraficoOcupacionCanchas } from "@/components/recaudacion/GraficoOcupacionCanchas";
import { GraficoReservasXmes } from "@/components/recaudacion/GraficoReservasXmes";
import { RecaudacionesMenuSuperior } from "@/components/recaudacion/ListaUsuariosSinRevisar";
import { useReserva } from "@/context/ReservaContext";

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Novedades");
  const [logged, setLogged] = useState(false);

  const { selectedYear } = useReserva();

  const {
    user,
    getAllUsers,
    getAllCuotasSociales,
    cuotasSociales,
    obtenerTodasLasNovedades,
    novedades,
    deleteNovedad,
    contarVistasNovedades,
  } = useUser();

  //Actualizar los estados de los socios despues del login
  useEffect(() => {
    if (user && !logged) {
      getAllUsers();
      getAllCuotasSociales();
      setLogged(true);
      obtenerTodasLasNovedades();
    }
  }, [
    user,
    getAllUsers,
    getAllCuotasSociales,
    logged,
    obtenerTodasLasNovedades,
    novedades,
    cuotasSociales,
  ]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <main className="bg-gradient-to-br from-orange-950 via-amber-500 to-orange-950 h-screen overflow-y-auto overflow-x-hidden">
      <Sidebar className="h-full flex flex-col justify-between">
        <div>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Novedades"
            active={activeItem === "Novedades"}
            onClick={() => handleItemClick("Novedades")}
            alert={novedades.length > 0}
          />
          <SidebarItem
            icon={<CalendarSearch size={20} />}
            text="Reservas"
            active={activeItem === "Reservas"}
            onClick={() => handleItemClick("Reservas")}
          />
          {user.rol_usuario === 2 && (
            <SidebarItem
              icon={<UserCircle size={20} />}
              text="Socios"
              active={activeItem === "Socios"}
              onClick={() => handleItemClick("Socios")}
            />
          )}
          {user.rol_usuario === 2 && (
            <SidebarItem
              icon={<BarChart3 size={20} />}
              text="Recaudación"
              active={activeItem === "Recaudación"}
              onClick={() => handleItemClick("Recaudación")}
              alert={
                cuotasSociales.filter((cuota) => cuota.revisado === false)
                  .length > 0
              }
            />
          )}
          <SidebarItem
            icon={<Receipt size={20} />}
            text="Pagos"
            active={activeItem === "Pagos"}
            onClick={() => handleItemClick("Pagos")}
          />
        </div>
        <div className="mt-auto">
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Mi Perfil"
            active={activeItem === "Mi Perfil"}
            onClick={() => handleItemClick("Mi Perfil")}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Contacto"
            active={activeItem === "Contacto"}
            onClick={() => handleItemClick("Contacto")}
          />
        </div>
      </Sidebar>

      {/* visualización de elementos de navegacion */}

      {/* NOVEDADES */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen sticky top-0 z-30 shadow-xl animate-fade-down ${
          activeItem === "Novedades" ? "" : "hidden"
        }`}
      >
        Novedades
      </h2>
      {user.rol_usuario === 2 && (
        <BarraNovedades
          usuarioId={user.id}
          active={activeItem === "Novedades"}
        />
      )}
      {/* renderizado condicional para que no se apliquen estilos si no esta seleccionado la opcion */}
      <div
        className={
          activeItem === "Novedades"
            ? "flex flex-wrap gap-4 mt-5 justify-center"
            : "hidden"
        }
      >
        {novedades.map((novedad) => (
          <NovedadCard
            key={novedad._id}
            id={novedad._id}
            titulo={novedad.titulo}
            descripcion={novedad.descripcion}
            imagen={novedad.imagen}
            isAdmin={user.rol_usuario === 2}
            onDelete={deleteNovedad}
            clicks={novedad.clicks}
            onClickIncrement={contarVistasNovedades}
            active={activeItem === "Novedades"}
          />
        ))}
      </div>

      {/* RESERVAS */}
      <ReservasDeUsuario
        usuarioId={user.id}
        active={activeItem === "Reservas"}
      />
      <ReservaCanchas
        active={activeItem === "Reservas"}
        admin={user.rol_usuario === 2}
      />

      {/* SOCIOS */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen sticky top-0 z-30 shadow-xl animate-fade-down ${
          activeItem === "Socios" ? "" : "hidden"
        }`}
      >
        Socios
      </h2>

      <TablaSocios active={activeItem === "Socios"} />

      {/* RECAUDACION */}
      <RecaudacionesMenuSuperior active={activeItem === "Recaudación"} />

      <div
        className={`flex flex-col items-center ${
          activeItem === "Recaudación" ? "" : "hidden"
        }`}
      >
        {/* Barra de Socios */}
        <div className="flex items-center w-full pl-5 py-2 -ml-8 my-6 bg-gradient-to-r from-gray-100 via-gray-300 to-transparent animate-fade-right ">
          <span className="text-lg mr-4">
            Información de Socios |{" "}
            <p className="font-medium inline">{selectedYear}</p>
          </span>
          <div className="h-1 bg-gradient-to-r from-gray-500 via-gray-300 to-transparent flex-grow"></div>
        </div>
        {/* Gráficos de Socios */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 w-full">
          <GraficoRegistroSocios active={activeItem === "Recaudación"} />
          <GraficoSociosXmes active={activeItem === "Recaudación"} />
        </div>

        {/* Barra de Canchas */}
        <div className="flex items-center w-full pl-5 py-2 -ml-8 my-6 bg-gradient-to-r from-gray-100 via-gray-300 to-transparent animate-fade-right ">
          <span className="text-lg mr-4">
            Información de Canchas |{" "}
            <p className="font-medium inline">{selectedYear}</p>
          </span>
          <div className="h-1 bg-gradient-to-r from-gray-500 via-gray-300 to-transparent flex-grow"></div>
        </div>
        {/* Gráficos de Canchas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <GraficoReservasXmes active={activeItem === "Recaudación"} />
          <GraficoOcupacionCanchas active={activeItem === "Recaudación"} />
        </div>
      </div>

      {/* PAGOS */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen sticky top-0 z-30 shadow-xl animate-fade-down ${
          activeItem === "Pagos" ? "" : "hidden"
        }`}
      >
        Pagos
      </h2>
      <Payment active={activeItem === "Pagos"} />
      <CuotaConfirmadaDeSocios active={activeItem === "Pagos"} />

      {/* MI PERFIL Y CONTACTO */}

      <MiPerfilFormulario active={activeItem === "Mi Perfil"} />
      <DeveloperContact active={activeItem === "Contacto"} />

      <Toaster />
    </main>
  );
}
