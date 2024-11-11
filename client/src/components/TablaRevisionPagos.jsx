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

async function actualizarEstadoUsuario(id) {
  const res = await obtenerCuotaSocialXid(id);
  res.data.revisado = true;
  actualizarCuotaSocial(res.data);
}

export default function TablaRevisionPagos({ active }) {
  // lo de abajo en realidad son cuotas a revisar XD!
  const [usuariosARevisar, setUsuariosARevisar] = useState([]);

  const { cuotasSociales, getAllCuotasSociales } = useUser();

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
  };

  return (
    <div
      className={`flex justify-center items-center animate-fade-left
        ${active ? "" : "hidden"} `}
    >
      <Card className="shadow-xl mt-3">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Lista de usuarios sin revisar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Socio</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead>Mes</TableHead>
                <TableHead>Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosARevisar.map((usuario) => (
                <TableRow key={usuario._id}>
                  <TableCell>
                    {usuario.socio.nombre + ", " + usuario.socio.apellido}
                  </TableCell>
                  <TableCell>{usuario.importe}</TableCell>
                  <TableCell>{usuario.mes}</TableCell>
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
