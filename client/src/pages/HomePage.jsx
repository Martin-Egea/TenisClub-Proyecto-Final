import { useState } from "react";
import { Sidebar, SidebarItem } from "../components/Sidebar";
import {
  LifeBuoy,
  Receipt,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Principal");
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <main>
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Principal"
          alert
          active={activeItem === "Principal"}
          onClick={() => handleItemClick("Principal")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Socios"
          active={activeItem === "Socios"}
          onClick={() => handleItemClick("Socios")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Estadisticas"
          active={activeItem === "Estadisticas"}
          onClick={() => handleItemClick("Estadisticas")}
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

      <div className=" h-screen bg-gray-100">
        <h1>/HomePage</h1>
      </div>
    </main>
  );
}
