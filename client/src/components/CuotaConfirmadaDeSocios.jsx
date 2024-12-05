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

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mr-3 rounded-lg bg-white animate-fade-up max-w-[600px] min-w-[200px] md:min-w-[535px] shadow-xl
    ${active ? "" : "hidden"} `}
      >
        <Table>
          <TableCaption>Lista de Cuotas Sociales Revisadas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Mes</TableHead>
              <TableHead className="font-bold text-center">Importe</TableHead>
              <TableHead className="font-bold text-center">Revisado</TableHead>
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
    </div>
  );
}

export default CuotaConfirmadaDeSocios;
