/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { format } from "date-fns";
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

// Simulamos una función para obtener las canchas desde MongoDB
const getCourts = async () => {
  // Aquí deberías hacer una llamada a tu API para obtener las canchas reales de MongoDB
  return [
    {
      _id: "67411b087eac71a15b7ce0c7",
      nombre: "Cancha 1",
      __v: 0,
    },
    {
      _id: "67411b977eac71a15b7ce0c9",
      nombre: "Cancha 2",
      __v: 0,
    },
    {
      _id: "674123837eac71a15b7ce0cc",
      nombre: "Cancha 3",
      __v: 0,
    },
    {
      _id: "6741238a7eac71a15b7ce0ce",
      nombre: "Cancha 4",
      __v: 0,
    },
    {
      _id: "6741238e7eac71a15b7ce0d0",
      nombre: "Cancha 5",
      __v: 0,
    },
    {
      _id: "674123947eac71a15b7ce0d2",
      nombre: "Cancha 6",
      __v: 0,
    },
    {
      _id: "674123977eac71a15b7ce0d4",
      nombre: "Cancha 7",
      __v: 0,
    },
  ];
};

// Simulamos una función para obtener las reservas
const getReservations = async (date, courtId) => {
  // Aquí deberías hacer una llamada a tu API para obtener las reservas reales de MongoDB
  return [
    {
      id_reserva: 1,
      _id: courtId,
      fecha: format(date, "yyyy-MM-dd"),
      hora_inicio: "10:00",
    },
    {
      id_reserva: 2,
      _id: courtId,
      fecha: format(date, "yyyy-MM-dd"),
      hora_inicio: "14:00",
    },
  ];
};

const timeSlots = [
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
  const [reservations, setReservations] = useState({});

  useEffect(() => {
    const fetchCourts = async () => {
      const courtsData = await getCourts();
      setCourts(courtsData);
    };
    fetchCourts();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsMap = {};
      for (const court of courts) {
        const res = await getReservations(selectedDate, court._id);
        reservationsMap[court._id] = res;
      }
      setReservations(reservationsMap);
    };
    if (courts.length > 0) {
      fetchReservations();
    }
  }, [selectedDate, courts]);

  const handleReservation = (courtId, time) => {
    // Aquí deberías implementar la lógica para crear una nueva reserva en MongoDB
    console.log(
      `Reserva realizada para la cancha ${courtId} el ${format(
        selectedDate,
        "dd/MM/yyyy"
      )} a las ${time}`
    );
  };

  const isReserved = (courtId, time) => {
    return reservations[courtId]?.some((r) => r.hora_inicio === time) || false;
  };

  const handleReserveAll = (courtId) => {
    // Implementar lógica para reservar todos los horarios disponibles en MongoDB
    console.log(
      `Reservando todos los horarios disponibles para la cancha ${courtId}`
    );
  };

  if (!active) return null;

  return (
    <div
      className={`flex justify-center items-center
        ${active ? "" : "hidden"} `}
    >
      <div className="w-full  mx-auto mr-3">
        <div className="mb-3 mt-6 flex justify-center items-center animate-fade-down">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal ${
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
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
          {courts.map((court) => (
            <Card key={court._id}>
              <CardHeader className="p-4">
                <CardTitle className="text-2xl font-semibold text-center p-0">
                  {court.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src="/Cancha-Tenis.png"
                    alt={`Cancha ${court.nombre}`}
                    className="absolute inset-0 w-full h-full object-contain rounded-xl transform rotate-[-90deg]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleReservation(court._id, time)}
                      disabled={isReserved(court._id, time)}
                      variant={
                        isReserved(court._id, time)
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        isReserved(court._id, time)
                          ? "w-full border border-red-300"
                          : "w-full border border-green-300 bg-green-100"
                      }
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full bg-orange-600 text-white mt-2 py-2 px-4 rounded-md hover:bg-orange-700"
                  variant="default"
                  onClick={() => handleReserveAll(court._id)}
                >
                  Reservar todos los horarios
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
