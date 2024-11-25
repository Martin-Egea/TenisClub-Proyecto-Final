/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { format, parse, isAfter, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useReserva } from "@/context/ReservaContext";

export function ReservasDeUsuario({ usuarioId, active }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    reservas,
    canchas,
    eliminarUnaReserva,
    obtenerTodasLasReservasDelAnio,
  } = useReserva();
  const { toast } = useToast();

  const misReservas = useMemo(() => {
    const now = new Date();
    return reservas
      .filter((reserva) => {
        const [hour, minute] = reserva.hora_inicio.split(":").map(Number);
        const reservaDate = parse(reserva.fecha, "dd/MM/yyyy", new Date());
        const reservaDateTime = setHours(setMinutes(reservaDate, minute), hour);
        return (
          reserva.id_usuario === usuarioId && isAfter(reservaDateTime, now)
        );
      })
      .sort((a, b) => {
        const [hourA, minuteA] = a.hora_inicio.split(":").map(Number);
        const [hourB, minuteB] = b.hora_inicio.split(":").map(Number);
        const dateA = parse(a.fecha, "dd/MM/yyyy", new Date());
        const dateB = parse(b.fecha, "dd/MM/yyyy", new Date());
        const dateTimeA = setHours(setMinutes(dateA, minuteA), hourA);
        const dateTimeB = setHours(setMinutes(dateB, minuteB), hourB);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });
  }, [reservas, usuarioId]);

  const getCanchaNombre = (canchaId) => {
    const cancha = canchas.find((c) => c._id === canchaId);
    return cancha ? cancha.nombre : "Cancha desconocida";
  };

  const handleCancelarReserva = (reservaId) => {
    try {
      eliminarUnaReserva(reservaId);
      obtenerTodasLasReservasDelAnio(new Date().getFullYear());
      toast({
        title: "Reserva cancelada",
        description: "Tu reserva ha sido cancelada exitosamente.",
      });
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      toast({
        title: "Error",
        description:
          "No se pudo cancelar la reserva. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`flex justify-center items-center sticky top-0 z-30
        ${active ? "" : "hidden"} `}
    >
      <div className="w-screen -ml-8 pl-3  bg-background shadow-md animate-fade-down">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-semibold">Mis Turnos</h2>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                {isOpen ? (
                  <>
                    Ocultar
                    <ChevronUp className="ml-2 h-4 w-4 z-50" />
                  </>
                ) : (
                  <>
                    Mostrar
                    <ChevronDown className="ml-2 h-4 w-4 z-50" />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 ">
              {misReservas.length > 0 ? (
                misReservas.map((reserva) => (
                  <Card
                    key={reserva._id}
                    className="mb-4 md:flex justify-between items-end"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {getCanchaNombre(reserva.id_cancha)}
                      </CardTitle>
                      <CardDescription className="text-black text-base">
                        {format(
                          parse(reserva.fecha, "dd/MM/yyyy", new Date()),
                          "EEEE d 'de' MMMM 'de' yyyy",
                          { locale: es }
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Horario: {reserva.hora_inicio}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelarReserva(reserva._id)}
                      >
                        Cancelar Reserva
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No tienes reservas próximas.
                </p>
              )}
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
