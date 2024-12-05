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
import TablaRevisionPagos from "../components/TablaRevisionPagos";
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

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Novedades");
  const [logged, setLogged] = useState(false);

  const {
    user,
    getAllUsers,
    getAllCuotasSociales,
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
            alert
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
              alert
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
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen animate-fade-down ${
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
      <ReservaCanchas active={activeItem === "Reservas"} />

      {/* SOCIOS */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen animate-fade-down ${
          activeItem === "Socios" ? "" : "hidden"
        }`}
      >
        Socios
      </h2>

      <TablaSocios active={activeItem === "Socios"} />

      {/* RECAUDACION */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen animate-fade-down ${
          activeItem === "Recaudación" ? "" : "hidden"
        }`}
      >
        Recaudación
      </h2>
      <GraficoRegistroSocios active={activeItem === "Recaudación"} />
      <div className="flex flex-wrap justify-center">
        <div className="md:flex md:justify-center grid grid-cols-1">
          <GraficoSociosXmes active={activeItem === "Recaudación"} />
          <GraficoReservasXmes active={activeItem === "Recaudación"} />
        </div>
        <div className="md:flex md:justify-center sm:flex-row-reverse grid grid-cols-1">
          <GraficoOcupacionCanchas active={activeItem === "Recaudación"} />
          <TablaRevisionPagos active={activeItem === "Recaudación"} />
        </div>
      </div>

      {/* PAGOS */}
      <h2
        className={`text-lg font-semibold bg-white pl-9 py-3 mb-4 w-screen animate-fade-down ${
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
