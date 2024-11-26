import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
export default function BarraNovedades({ active }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const { createNovedad } = useUser();

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // lógica para guardar o procesar la nueva novedad
  const handleSubmit = (e) => {
    e.preventDefault();
    // creo un objeto FormData para enviar la imagen
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagenUrl);

    createNovedad(formData);

    setTitulo("");
    setDescripcion("");
    setImagenUrl("");
  };

  return (
    <div
      className={`flex justify-center items-center mt-3 mr-3 animate-fade-down
        ${active ? "" : "hidden"} `}
    >
      <Card className="w-full pt-3 overflow-hidden">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ingrese el título"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="imagen">Imagen</Label>
                <Input
                  className="cursor-pointer"
                  id="imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleImagenChange}
                  required
                />
              </div>
            </div>
            <div className="">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción"
                required
              />
            </div>

            {imagenUrl && (
              <div className="mt-4">
                <img
                  src={imagenUrl}
                  alt="Vista previa"
                  className="w-full max-h-48 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-5/12 font-bold bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
              >
                Agregar Novedad
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
