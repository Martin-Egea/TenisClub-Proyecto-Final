import { useState } from "react";
import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Payment } from "../components/Payment";
import {
  LifeBuoy,
  Receipt,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import CuotaConfirmadaDeSocios from "../components/CuotaConfirmadaDeSocios";
import TablaSocios from "../components/TablaSocios";
import TablaRevisionPagos from "../components/TablaRevisionPagos";
import GraficoRegistroSocios from "@/components/GraficoRegistroSocios";
import { useUser } from "@/context/UserContext";

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Novedades");
  const { user } = useUser();

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
          <SidebarItem icon={<Settings size={20} />} text="Mi Perfil" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Contacto" />
        </div>
      </Sidebar>

      {/* visualización de elementos de navegacion */}
      <Payment active={activeItem === "Pagos"} />

      <CuotaConfirmadaDeSocios active={activeItem === "Pagos"} />

      <TablaSocios active={activeItem === "Socios"} />

      <GraficoRegistroSocios active={activeItem === "Recaudación"} />
      <TablaRevisionPagos active={activeItem === "Recaudación"} />
    </main>
  );
}
