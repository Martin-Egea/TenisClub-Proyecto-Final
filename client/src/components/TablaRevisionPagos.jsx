/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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

import { useUser } from "../context/UserContext.jsx";
import {
  actualizarCuotaSocial,
  obtenerCuotaSocialXid,
} from "../api/cuotaSocial.api.js";
import { actualizarUsuario, buscarUsuarioXid } from "../api/user.api.js";
import { importeFormateado, mesFormateado } from "../utils/formatearDatos.js";

async function actualizarEstadoUsuario(id) {
  const res = await obtenerCuotaSocialXid(id);
  res.data.revisado = true;
  actualizarCuotaSocial(res.data);

  const user = await buscarUsuarioXid(res.data.socio);
  user.data.socio_activo = true;
  console.log(user.data);
  actualizarUsuario(user.data);
}

export default function TablaRevisionPagos({ active }) {
  // lo de abajo en realidad son cuotas a revisar XD!
  const [usuariosARevisar, setUsuariosARevisar] = useState([]);
  const { cuotasSociales, getAllCuotasSociales, getAllUsers } = useUser();

  useEffect(() => {
    const cargarCuotasSociales = async () => {
      try {
        const response = cuotasSociales.filter(
          (cuota) => cuota.revisado === false
        );
        setUsuariosARevisar(response);
      } catch (error) {
        console.error("Error al cargar las cuotas sociales:", error);
      }
    };
    cargarCuotasSociales();
  }, [cuotasSociales]);

  const handleConfirmarRevision = async (id) => {
    await actualizarEstadoUsuario(id);
    getAllCuotasSociales();
    getAllUsers();
  };

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center animate-fade-up 
        ${active ? "" : "hidden"} `}
    >
      <Card className="shadow-xl mt-3 mr-3 w-[300px] md:min-w-fit">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Lista de usuarios sin revisar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Socio</TableHead>
                <TableHead className="text-center">Importe</TableHead>
                <TableHead className="text-center">Mes</TableHead>
                <TableHead className="text-center">Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosARevisar.map((usuario) => (
                <TableRow key={usuario._id}>
                  <TableCell>
                    {usuario.socio.nombre + ", " + usuario.socio.apellido}
                  </TableCell>
                  <TableCell className="text-right">
                    ${importeFormateado(usuario.importe)}
                  </TableCell>
                  <TableCell>{mesFormateado(usuario.mes)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleConfirmarRevision(usuario._id)}
                      variant="outline"
                      className="font-bold bg-orange-600 text-white mt-4 rounded-md hover:bg-orange-700 outline-none"
                    >
                      Confirmar pago
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
