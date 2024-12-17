/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useUser } from "@/context/UserContext.jsx";
import {
  actualizarCuotaSocial,
  obtenerCuotaSocialXid,
} from "@/api/cuotaSocial.api.js";
import { actualizarUsuario, buscarUsuarioXid } from "@/api/user.api.js";
import { importeFormateado, mesFormateado } from "@/utils/formatearDatos.js";

async function actualizarEstadoUsuario(id) {
  const res = await obtenerCuotaSocialXid(id);
  res.data.revisado = true;
  actualizarCuotaSocial(res.data);

  const user = await buscarUsuarioXid(res.data.socio);
  user.data.socio_activo = true;
  console.log(user.data);
  actualizarUsuario(user.data);
}

export function RecaudacionesMenuSuperior({ active }) {
  const [usuariosARevisar, setUsuariosARevisar] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { cuotasSociales, getAllCuotasSociales, getAllUsers } = useUser();

  const handleConfirmarRevision = async (id) => {
    await actualizarEstadoUsuario(id);
    getAllCuotasSociales();
    getAllUsers();
  };

  const handleCancelarRevision = (id) => {
    // Implement cancellation logic here
    console.log("Cancelar revisión para:", id);
  };

  const handleMostrarUsuarios = () => {
    const usuariosSinRevisar = cuotasSociales.filter(
      (cuota) => cuota.revisado === false
    );
    setUsuariosARevisar(usuariosSinRevisar);
    setIsOpen(true);
  };

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center sticky top-0 z-30
        ${active ? "" : "hidden"} `}
    >
      <div className="w-screen -ml-8 pl-3 shadow-md animate-fade-down bg-white bg-opacity-70">
        <div className="flex items-center justify-between bg-white px-4 py-2 shadow-2xl">
          <h1 className="text-lg font-semibold">Recaudaciones</h1>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border border-gray-400"
                onClick={handleMostrarUsuarios}
              >
                Mostrar Usuarios
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[calc(100vw-2rem)] md:w-full p-0 max-h-[80vh] overflow-auto mt-5 animate-fade-down animate-duration-400"
              align="end"
            >
              <Card className="w-full border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Lista de usuarios sin revisar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden md:table-cell">
                            Socio
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-right">
                            Importe
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Mes
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Acciones
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usuariosARevisar.map((usuario) => (
                          <TableRow
                            key={usuario._id}
                            className="flex flex-col md:table-row"
                          >
                            <TableCell className="font-medium md:w-1/4">
                              <span className="md:hidden font-bold">
                                Socio:{" "}
                              </span>
                              {usuario.socio.nombre +
                                ", " +
                                usuario.socio.apellido}
                            </TableCell>
                            <TableCell className="md:text-right md:w-1/4">
                              <span className="md:hidden font-bold">
                                Importe:{" "}
                              </span>
                              ${importeFormateado(usuario.importe)}
                            </TableCell>
                            <TableCell className="md:w-1/4">
                              <span className="md:hidden font-bold">Mes: </span>
                              {mesFormateado(usuario.mes)}
                            </TableCell>
                            <TableCell className="md:w-1/4">
                              <div className="flex flex-row gap-2 justify-start md:justify-end">
                                <Button
                                  onClick={() =>
                                    handleConfirmarRevision(usuario._id)
                                  }
                                  variant="default"
                                  size="sm"
                                  className="w-1/2 md:w-auto bg-green-400 text-slate-900 rounded-md hover:bg-green-500"
                                >
                                  Confirmar
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleCancelarRevision(usuario._id)
                                  }
                                  variant="outline"
                                  size="sm"
                                  className="w-1/2 md:w-auto bg-red-400 text-slate-900 rounded-md hover:bg-red-500"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
