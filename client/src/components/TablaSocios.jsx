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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, XCircle } from "lucide-react";
import { useUser } from "../context/UserContext";
import { importeFormateado, mesFormateado } from "../utils/formatearDatos.js";

export default function TablaSocios({ active }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cuotasUsuario, setCuotasUsuario] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const { allUsers, cuotasSociales } = useUser();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setUsuarios(allUsers);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    cargarUsuarios();
  }, [allUsers]);

  //filtrado de socios en la tabla
  useEffect(() => {
    const resultadosFiltrados = usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busqueda.toLowerCase())
    );
    setUsuariosFiltrados(resultadosFiltrados);
  }, [busqueda, usuarios, allUsers]);

  const cargarCuotasUsuario = async (userId) => {
    try {
      // carga de cuotas revisadas para un usuario específico
      const cuotas = cuotasSociales.filter(
        (cuota) =>
          cuota.socio._id === userId &&
          cuota.revisado === true &&
          /^\d{4}/.test(cuota.mes) && // comprueba que el mes tenga 4 digitos al principio.
          cuota.mes.startsWith(new Date().getFullYear().toString())
      );
      setCuotasUsuario(cuotas);
    } catch (error) {
      console.error("Error al cargar cuotas:", error);
    }
  };

  const handleRowClick = (usuario) => {
    setUsuarioSeleccionado(usuario);
    cargarCuotasUsuario(usuario._id);
    setDialogoAbierto(true);
  };

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 animate-fade-left
        ${active ? "" : "hidden"} `}
    >
      <Card className="shadow-2xl md:min-w-[742px]">
        <CardHeader className="p-3">
          <CardTitle className="font-bold text-center text-2xl p-0">
            Tabla de Socios
          </CardTitle>
        </CardHeader>
        <CardContent className="w-80 md:w-auto">
          <div className="flex items-center space-x-2 mb-4 ">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre, apellido o email"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-grow border border-orange-300"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-orange-700">
                  Apellido
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Nombre
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Email
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Teléfono
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Localidad
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Socio Activo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((usuario) => (
                <TableRow
                  key={usuario._id}
                  onClick={() => handleRowClick(usuario)}
                  className="cursor-pointer hover:bg-gray-100 "
                >
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell className="text-left">{usuario.email}</TableCell>
                  <TableCell className="text-right">
                    {usuario.telefono}
                  </TableCell>
                  <TableCell>{usuario.localidad}</TableCell>
                  <TableCell className="text-center">
                    {usuario.socio_activo ? (
                      <div className="flex justify-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Sí
                      </div>
                    ) : (
                      <div className="flex justify-center text-red-600">
                        <XCircle className="h-5 w-5 mr-2" />
                        No
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent className="sm:max-w-[425px] animate-fade">
          <DialogHeader>
            <DialogTitle>
              Cuotas de: {usuarioSeleccionado?.nombre}{" "}
              {usuarioSeleccionado?.apellido}
            </DialogTitle>
            <DialogDescription>
              Detalle de las cuotas pagadas por el socio.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-bold text-orange-700">
                  Mes
                </TableHead>
                <TableHead className="text-center font-bold text-orange-700">
                  Importe
                </TableHead>
                <TableHead className="text-center font-bold text-orange-700">
                  Fecha de Pago
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cuotasUsuario.map((cuota) => (
                <TableRow key={cuota._id}>
                  <TableCell className="text-right">
                    {mesFormateado(cuota.mes)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${importeFormateado(cuota.importe)}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(cuota.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={() => setDialogoAbierto(false)}
            className=" bg-orange-600 text-white mt-4 rounded-md hover:bg-orange-700 outline-none "
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
