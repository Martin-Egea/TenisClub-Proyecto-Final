/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NovedadCard({
  id,
  titulo,
  descripcion,
  imagen,
  isAdmin = false,
  onDelete,
  clicks,
  onClickIncrement,
  active,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
    toast({
      title: "Novedad eliminada",
      variant: "destructive",
    });
  };

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onClickIncrement(id);
    }
  };

  // si el componente no esta activo, no mostrar nada
  if (!active) {
    return null;
  }

  return (
    <>
      <div
        className={`flex justify-center items-center mr-3 ${
          active ? "" : "hidden"
        }`}
      >
        <Card
          className="w-full max-w-sm cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-fade"
          onClick={handleCardClick}
        >
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={imagen}
              alt={titulo}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <CardDescription className="line-clamp-3">
              {descripcion}
            </CardDescription>
          </CardContent>
          {isAdmin && (
            <CardFooter className="justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1" />
                {clicks} {clicks === 1 ? "vista" : "vistas"}
              </div>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <X className="w-4 h-4 mr-2" /> Eliminar
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl animate-fade animate-duration-300">
          <DialogHeader>
            <DialogTitle>{titulo}</DialogTitle>
          </DialogHeader>
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
