/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { CheckCircle, XCircle } from "lucide-react";
import { importeFormateado, mesFormateado } from "../utils/formatearDatos.js";

export function CuotaConfirmadaDeSocios({ active }) {
  const { cuotasSociales, user } = useUser();

  const cuotasRevisadas = cuotasSociales.filter(
    (cuota) => user.id === cuota.socio._id
  );

  return (
    <div
      className={`flex justify-center mr-3 rounded-lg items-center bg-white opacity-100 animate-fade-up
    ${active ? "" : "hidden"} `}
    >
      <Table>
        <TableCaption>Lista de Cuotas Sociales Revisadas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Mes</TableHead>
            <TableHead className="text-center">Importe</TableHead>
            <TableHead className="text-center">Revisado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cuotasRevisadas.map((cuota, index) => (
            <TableRow
              key={index}
              className={cuota.revisado ? "bg-green-50" : "bg-red-50"}
            >
              <TableCell>{mesFormateado(cuota.mes)}</TableCell>
              <TableCell className="text-right">
                $ {importeFormateado(cuota.importe)}
              </TableCell>
              <TableCell className="flex justify-center">
                {cuota.revisado ? (
                  <div className="flex text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Revisado
                  </div>
                ) : (
                  <div className="flex text-red-600">
                    <XCircle className="h-5 w-5 mr-2" />
                    No revisado
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CuotaConfirmadaDeSocios;
