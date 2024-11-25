/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReserva } from "@/context/ReservaContext";
import { useUser } from "@/context/UserContext";

const horariosDisponibles = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export function ReservaCanchas({ active }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courts, setCourts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [previousYear, setPreviousYear] = useState(null);
  const [reserveAllCompleted, setReserveAllCompleted] = useState(false);

  const {
    canchas,
    obtenerTodasLasCanchas,
    obtenerTodasLasReservasDelAnio,
    reservas,
    crearNuevaReserva,
  } = useReserva();
  const { user } = useUser();

  // Cargar y actualizar la lista de canchas cuando cambian
  useEffect(() => {
    if (courts.length === 0) {
      obtenerTodasLasCanchas();
      setCourts(canchas);
    }
  }, [courts, obtenerTodasLasCanchas, canchas]);

  // Actualizar las reservaciones cuando cambia el año
  useEffect(() => {
    const year = selectedDate.getFullYear();
    if (year !== previousYear) {
      obtenerTodasLasReservasDelAnio(year);
      setPreviousYear(year);
    }
    setReserveAllCompleted(false);
  }, [
    selectedDate,
    obtenerTodasLasReservasDelAnio,
    previousYear,
    reserveAllCompleted,
  ]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleReservationClick = useCallback((courtId, time) => {
    setSelectedReservation({ courtId, time });
    setIsDialogOpen(true);
  }, []);

  // Lógica para confirmar la reserva
  const handleReservationConfirm = useCallback(() => {
    if (selectedReservation) {
      const nuevaReserva = {
        id_cancha: selectedReservation.courtId,
        fecha: format(selectedDate, "dd/MM/yyyy"),
        hora_inicio: selectedReservation.time,
        id_usuario: user.id,
      };
      //console.log(nuevaReserva);
      crearNuevaReserva(nuevaReserva);

      setIsDialogOpen(false);
      setSelectedReservation(null);
      // Actualizar las reservaciones después de confirmar la reserva.
      obtenerTodasLasReservasDelAnio(selectedDate.getFullYear());
    }
  }, [
    selectedReservation,
    selectedDate,
    obtenerTodasLasReservasDelAnio,
    crearNuevaReserva,
    user.id,
  ]);

  // Lógica para verificar si una hora ya esta reservada
  const isReserved = useCallback(
    (courtId, time) => {
      const formattedDate = format(selectedDate, "dd/MM/yyyy");
      const reserved = reservas.some((r) => {
        const reservaDate = parse(r.fecha, "dd/MM/yyyy", new Date());
        return (
          r.id_cancha === courtId &&
          format(reservaDate, "dd/MM/yyyy") === formattedDate &&
          r.hora_inicio === time
        );
      });
      /* console.log(
        `Verificando reserva: ${courtId}, ${formattedDate}, ${time} - Reservada: ${reserved}`
      ); */
      return reserved;
    },
    [reservas, selectedDate]
  );

  // Lógica para reservar todos los horarios
  const handleReserveAll = useCallback(
    (courtId) => {
      // Implementar lógica para reservar todos los horarios disponibles en MongoDB
      for (const horarios of horariosDisponibles) {
        const nuevaReserva = {
          id_cancha: courtId,
          fecha: format(selectedDate, "dd/MM/yyyy"),
          hora_inicio: horarios,
          id_usuario: user.id,
        };
        //console.log(nuevaReserva);
        crearNuevaReserva(nuevaReserva);
      }
      setReserveAllCompleted(true);
      // Después de reservar todos, actualizamos las reservaciones
      obtenerTodasLasReservasDelAnio(selectedDate.getFullYear());
    },
    [obtenerTodasLasReservasDelAnio, selectedDate, crearNuevaReserva, user.id]
  );
  // Mostrar las reservas actuales
  /* useEffect(() => {
    console.log("Reservas actuales:", reservas);
  }, [reservas]); */

  if (!active) return null;

  return (
    <div
      className={`flex justify-center items-center sticky top-0
        ${active ? "" : "hidden"} `}
    >
      <div className="w-full  mx-auto mr-3">
        <div className="mb-3 mt-4 flex justify-center items-center sticky top-16 z-50 animate-fade-down">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left border border-gray-400 font-semibold shadow-xl ${
                  !selectedDate ? "text-muted-foreground" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: es })
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                caption_label={({ day }) => (
                  <span className="text-sm font-medium capitalize">
                    {day.toLocaleString("default", { month: "short" })}
                  </span>
                )}
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
          {courts.map((court) => (
            <Card key={court._id}>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-2xl font-semibold text-center p-0">
                  {court.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/Cancha-Tenis.png"
                    alt={`Cancha ${court.nombre}`}
                    className="absolute inset-0 w-full h-full object-contain rounded-md transform"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {horariosDisponibles.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleReservationClick(court._id, time)}
                      disabled={isReserved(court._id, time)}
                      variant={
                        isReserved(court._id, time)
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        isReserved(court._id, time)
                          ? "w-full border border-red-900"
                          : "w-full border border-green-300 bg-green-100 hover:bg-green-300"
                      }
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                <Button
                  className={`w-full bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700 ${
                    user.rol_usuario !== 2 && "hidden"
                  }`}
                  variant="default"
                  onClick={() => handleReserveAll(court._id)}
                >
                  Reservar todos los horarios
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Reserva</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas reservar este horario?
              </DialogDescription>
            </DialogHeader>
            {selectedReservation && (
              <div className="py-4">
                <p>Fecha: {format(selectedDate, "PPP", { locale: es })}</p>
                <p>
                  Cancha:{" "}
                  {
                    courts.find((c) => c._id === selectedReservation.courtId)
                      ?.nombre
                  }
                </p>
                <p>Horario: {selectedReservation.time}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-green-400 text-slate-950 px-4 rounded-md hover:bg-green-500"
                onClick={handleReservationConfirm}
              >
                Confirmar Reserva
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
