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
  const { user, getAllUsers, getAllCuotasSociales } = useUser();
  const [logged, setLogged] = useState(false);

  //Actualizar los estados de los socios despues del login
  useEffect(() => {
    if (user && !logged) {
      getAllUsers();
      getAllCuotasSociales();
      setLogged(true);
    }
  }, [user, getAllUsers, getAllCuotasSociales, logged]);

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
        <NovedadCard
          titulo="Novedad 1"
          descripcion="ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
          imagen="https://lh4.googleusercontent.com/proxy/5_ILxH5Sn1iKQsa4IAxWW5vkKTtqrwOhplNjUVbtk8CN2_DKnEvUYeyaJT3uYzRDwMUhzcquqhEbg5DH1huqrW20ArEoeX3TO3UN1L01wy8T69A2llKczzGEtqiZ477Rc7_lC-OYZ6RhopxiEF_HGj4XofLJYHICam48Gw"
          isAdmin={user.rol_usuario === 2}
          active={activeItem === "Novedades"}
        />
        <NovedadCard
          titulo="Novedad 2"
          descripcion="ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
          imagen="https://services.meteored.com/img/article/torneio-de-tenis-us-open-em-nova-iorque-reajusta-se-aos-novos-desafios-impostos-pelas-alteracoes-climaticas-1724693275614_512.jpeg"
          isAdmin={user.rol_usuario === 2}
          active={activeItem === "Novedades"}
        />
        <NovedadCard
          titulo="Novedad 3"
          descripcion="ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
          imagen="https://www.superprof.com.ar/blog/wp-content/uploads/2024/01/pexels-dmytro-2694942.jpg"
          isAdmin={user.rol_usuario === 2}
          active={activeItem === "Novedades"}
        />
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
