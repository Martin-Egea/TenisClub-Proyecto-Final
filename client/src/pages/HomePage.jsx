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

      <ReservasDeUsuario
        usuarioId={user.id}
        active={activeItem === "Reservas"}
      />

      <ReservaCanchas active={activeItem === "Reservas"} />

      {user.rol_usuario === 2 && (
        <BarraNovedades
          usuarioId={user.id}
          active={activeItem === "Novedades"}
        />
      )}
      <div className="flex flex-wrap gap-4 mt-5 justify-center">
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

      <Payment active={activeItem === "Pagos"} />
      <CuotaConfirmadaDeSocios active={activeItem === "Pagos"} />

      <TablaSocios active={activeItem === "Socios"} />

      <GraficoRegistroSocios active={activeItem === "Recaudación"} />
      <TablaRevisionPagos active={activeItem === "Recaudación"} />

      <MiPerfilFormulario active={activeItem === "Mi Perfil"} />

      <DeveloperContact active={activeItem === "Contacto"} />

      <Toaster />
    </main>
  );
}
