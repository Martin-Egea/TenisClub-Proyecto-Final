import { useState } from "react";
import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Payment } from "../components/Payment";
import {
  LifeBuoy,
  Receipt,
  UserCircle,
  BarChart3,
  Trophy,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import CuotaSocios from "../components/CuotaSocios";
import TablaSocios from "../components/TablaSocios";
import TablaRevisionPagos from "../components/TablaRevisionPagos";
//import { GraficoRecaudacion } from "../components/GraficoRecaudacion";

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Novedades");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <main className="bg-gradient-to-br from-orange-950 via-amber-500 to-orange-950 h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Novedades"
          active={activeItem === "Novedades"}
          onClick={() => handleItemClick("Novedades")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Socios"
          active={activeItem === "Socios"}
          onClick={() => handleItemClick("Socios")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Recaudación"
          active={activeItem === "Recaudación"}
          onClick={() => handleItemClick("Recaudación")}
          alert
        />
        <SidebarItem
          icon={<Trophy size={20} />}
          text="Torneos"
          active={activeItem === "Torneos"}
          onClick={() => handleItemClick("Torneos")}
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Pagos"
          active={activeItem === "Pagos"}
          onClick={() => handleItemClick("Pagos")}
        />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Mi Perfil" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Contacto" />
      </Sidebar>

      {/* visualización de elementos de navegacion */}
      <Payment active={activeItem === "Pagos"} />

      <CuotaSocios active={activeItem === "Pagos"} />

      <TablaSocios active={activeItem === "Socios"} />

      <TablaRevisionPagos active={activeItem === "Recaudación"} />
      {/* <GraficoRecaudacion active={activeItem === "Recaudación"} /> */}
    </main>
  );
}
