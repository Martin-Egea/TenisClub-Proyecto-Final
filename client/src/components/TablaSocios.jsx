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
import { useUser } from "../context/UserContext";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  }, [busqueda, usuarios]);

  const cargarCuotasUsuario = async (userId) => {
    try {
      // carga de cuotas para un usuario específico
      const cuotas = cuotasSociales.filter((cuota) => cuota.socio === userId);
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

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4
        ${active ? "" : "hidden"} `}
    >
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-center text-2xl">
            Tabla de Socios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre, apellido o email"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-orange-700">
                  Nombre
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Apellido
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
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                  <TableCell>{usuario.localidad}</TableCell>
                  <TableCell>{usuario.socio_activo ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent className="sm:max-w-[425px]">
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
                <TableHead className="font-bold text-orange-700">Mes</TableHead>
                <TableHead className="font-bold text-orange-700">
                  Importe
                </TableHead>
                <TableHead className="font-bold text-orange-700">
                  Fecha de Pago
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cuotasUsuario.map((cuota) => (
                <TableRow key={cuota._id}>
                  <TableCell>{cuota.mes}</TableCell>
                  <TableCell>${cuota.importe.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(cuota.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={() => setDialogoAbierto(false)}
            className=" font-bold bg-orange-600 text-white mt-4 rounded-md hover:bg-orange-700"
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
