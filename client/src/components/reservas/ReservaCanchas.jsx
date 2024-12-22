/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useMemo } from "react";
import { format, parse, isAfter, startOfDay, isSameDay } from "date-fns";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useReserva } from "@/context/ReservaContext";
import { useUser } from "@/context/UserContext";
import { enviarMail } from "@/api/mailer.api";
import { useToast } from "@/hooks/use-toast";

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

export function ReservaCanchas({ active, admin }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courts, setCourts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  /* const [previousYear, setPreviousYear] = useState(null);
  const [reserveAllCompleted, setReserveAllCompleted] = useState(false); */
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [reservaUsuario, setReservaUsuario] = useState({});

  const {
    canchas,
    obtenerTodasLasCanchas,
    /* obtenerTodasLasReservasDelAnio, */
    reservas,
    crearNuevaReserva,
    eliminarUnaReserva,
  } = useReserva();
  const { user, findUserById } = useUser();
  const { toast } = useToast();

  const contenidoMail = useMemo(
    () => ({
      email: reservaUsuario.email,
      subject: "Reserva Cancelada",
      message: `Hola ${reservaUsuario.nombre} ${reservaUsuario.apellido}, lamentamos informarte que tu reserva ha sido cancelada. Por favor, ponte en contacto con nosotros para más información.`,
    }),
    [reservaUsuario.email, reservaUsuario.nombre, reservaUsuario.apellido]
  );

  // Cargar el nombre del usuario de la reserva seleccionada
  useEffect(() => {
    const fetchUserName = async () => {
      if (selectedReservation) {
        const idUsuario = selectedReservation.id_usuario;
        if (!idUsuario) return;
        const user = await findUserById(idUsuario);
        setReservaUsuario(user);
      }
    };
    fetchUserName();
  }, [findUserById, selectedReservation]);

  // Cargar y actualizar la lista de canchas cuando cambian
  useEffect(() => {
    if (courts.length === 0) {
      obtenerTodasLasCanchas();
      setCourts(canchas);
    }
  }, [courts, obtenerTodasLasCanchas, canchas]);
  /* useEffect(() => {
    obtenerTodasLasCanchas();
  }, [obtenerTodasLasCanchas]);
  
  useEffect(() => {
    setCourts(canchas);
  }, [canchas]); */

  // Actualizar las reservaciones cuando cambia el año
  /* useEffect(() => {
    const year = selectedDate.getFullYear();
    if (year !== previousYear) {
      obtenerTodasLasReservasDelAnio(year);
      setPreviousYear(year);
    }
    setReserveAllCompleted(false);
    console.log("Algo");
  }, [selectedDate, obtenerTodasLasReservasDelAnio, previousYear]); */

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleReservationClick = useCallback((courtId, time) => {
    setSelectedReservation({ courtId, time });
    setIsDialogOpen(true);
  }, []);

  //------------------------------------------
  const handleAdminReservationClick = useCallback(
    (courtId, time) => {
      const formattedDate = format(selectedDate, "dd/MM/yyyy");
      const reservation = reservas.find(
        (r) =>
          r.id_cancha === courtId &&
          r.fecha === formattedDate &&
          r.hora_inicio === time
      );
      if (reservation) {
        const reservationDate = parse(
          reservation.fecha,
          "dd/MM/yyyy",
          new Date()
        );
        const isDateValidForCancellation =
          isAfter(startOfDay(reservationDate), startOfDay(new Date())) ||
          isSameDay(reservationDate, new Date());

        if (isDateValidForCancellation) {
          setSelectedReservation(reservation);
          setIsAdminDialogOpen(true);
        } else {
          toast({
            description: "No se pueden cancelar reservas de fechas pasadas!",
            variant: "destructive",
          });
        }
      }
    },
    [reservas, selectedDate, toast]
  );

  // Lógica para cancelar una reserva siendo administrador
  const handleCancelReservation = useCallback(() => {
    if (selectedReservation) {
      // Enviar un mail al usuario informando la cancelación
      const { email, subject, message } = contenidoMail;

      enviarMail({ email, subject, message });
      eliminarUnaReserva(selectedReservation._id);
      toast({
        description: "Reserva de usuario cancelada!",
        variant: "destructive",
      });

      setIsAdminDialogOpen(false);
      setSelectedReservation(null);

      // actualizar las reservas despues de cancelar la reserva
      /* obtenerTodasLasReservasDelAnio(selectedDate.getFullYear()); */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedReservation,
    /* selectedDate,
    obtenerTodasLasReservasDelAnio, */
    contenidoMail,
    eliminarUnaReserva,
  ]);
  //------------------------------------------

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

      toast({
        description: "Reserva confirmada!",
        variant: "success",
      });

      setIsDialogOpen(false);
      setSelectedReservation(null);
      // Actualizar las reservaciones después de confirmar la reserva.
      /* obtenerTodasLasReservasDelAnio(selectedDate.getFullYear()); */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedReservation,
    selectedDate,
    /* obtenerTodasLasReservasDelAnio, */
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
      if (
        isAfter(startOfDay(selectedDate), startOfDay(new Date())) ||
        isSameDay(selectedDate, new Date())
      ) {
        // lógica para reservar todos los horarios disponibles en MongoDB
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
        toast({
          title: "Todos los horarios reservados!",
          variant: "success",
        });
        // Después de reservar todos, actualizamos las reservaciones
        /* obtenerTodasLasReservasDelAnio(selectedDate.getFullYear()); */
      } else {
        toast({
          title: "No se pueden reservar horarios para fechas pasadas",
          variant: "error",
        });
      }
    },
    [
      /* obtenerTodasLasReservasDelAnio, */ selectedDate,
      crearNuevaReserva,
      toast,
      user.id,
    ]
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
                {selectedDate &&
                selectedDate instanceof Date &&
                !isNaN(selectedDate.getTime()) ? (
                  format(selectedDate, "PPP", { locale: es })
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 animate-fade-down animate-duration-300">
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
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-semibold bg-zinc-200 rounded-t-lg text-center p-2">
                  {court.nombre.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 ">
                {/* <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/Cancha-Tenis.png"
                    alt={`Cancha ${court.nombre}`}
                    className="absolute inset-0 w-full h-full object-contain rounded-md transform"
                  />
                </div> */}
                <div className="grid grid-cols-3 gap-2">
                  {horariosDisponibles.map((time) => {
                    const isDateValidForReservation =
                      isAfter(
                        startOfDay(selectedDate),
                        startOfDay(new Date())
                      ) || isSameDay(selectedDate, new Date());
                    const isDateValidForCancellation =
                      isDateValidForReservation;
                    const isClickable =
                      isDateValidForReservation ||
                      (admin &&
                        isReserved(court._id, time) &&
                        isDateValidForCancellation);

                    return (
                      <Button
                        key={time}
                        onClick={() =>
                          isClickable
                            ? isReserved(court._id, time) && admin
                              ? handleAdminReservationClick(court._id, time)
                              : handleReservationClick(court._id, time)
                            : null
                        }
                        disabled={!isClickable}
                        variant={
                          isReserved(court._id, time)
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          isReserved(court._id, time)
                            ? "w-full border border-red-600 hover:bg-red-700"
                            : "w-full border border-green-300 bg-green-100 hover:bg-green-300"
                        }
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  className={`w-full bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700 ${
                    user.rol_usuario !== 2 && "hidden"
                  }`}
                  variant="default"
                  onClick={() => handleReserveAll(court._id)}
                  disabled={
                    !isAfter(
                      startOfDay(selectedDate),
                      startOfDay(new Date())
                    ) && !isSameDay(selectedDate, new Date())
                  }
                >
                  Reservar todos los horarios
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="animate-fade animate-duration-300">
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
        <AlertDialog
          open={isAdminDialogOpen}
          onOpenChange={setIsAdminDialogOpen}
        >
          <AlertDialogContent className="animate-fade animate-duration-300">
            <AlertDialogHeader>
              <AlertDialogTitle>Información de Reserva</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedReservation && (
                  <>
                    <div>
                      <span className="font-bold">Fecha:</span>{" "}
                      {selectedReservation.fecha}
                    </div>
                    <div>
                      <span className="font-bold">Hora:</span>{" "}
                      {selectedReservation.hora_inicio}
                    </div>
                    <div>
                      <span className="font-bold">Usuario:</span>{" "}
                      {`${reservaUsuario.nombre} ${reservaUsuario.apellido}`}
                    </div>
                  </>
                )}
                <br />
                <hr />
                <br />
                <span>
                  <span className="font-bold">Atención:</span> al calcelar una
                  reserva se le enviará un mail al usuario informándolo.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cerrar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelReservation}
                className="bg-red-500 text-white px-4 rounded-md hover:bg-red-700"
              >
                Cancelar Reserva
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
