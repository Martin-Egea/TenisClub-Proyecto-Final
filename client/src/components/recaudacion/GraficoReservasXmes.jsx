/* eslint-disable react/prop-types */
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useReserva } from "@/context/ReservaContext";
import { useMemo } from "react";
import { useEffect } from "react";

const chartConfig = {
  reservas: {
    label: "Reservas",
    color: "hsl(var(--chart-1))",
  },
};
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function contarReservasPorMes(reservas, meses) {
  return reservas.reduce(
    (acc, reserva) => {
      // Extraemos el mes del campo 'fecha' (formato dd/mm/yyyy)
      // eslint-disable-next-line no-unused-vars
      const [_, mes, __] = reserva.fecha.split("/");

      // Convertimos el mes a índice (0 para enero, 11 para diciembre)
      const mesIndex = parseInt(mes, 10) - 1;

      // Incrementamos el contador de reservas para ese mes
      acc[mesIndex].reservas += 1;

      return acc;
    },
    meses.map((mes) => ({ month: mes, reservas: 0 }))
  );
}

export function GraficoReservasXmes({ active }) {
  const { reservas, obtenerTodasLasReservasDelAnio, selectedYear } =
    useReserva();

  const datosProcesados = useMemo(
    () => contarReservasPorMes(reservas, meses),
    [reservas]
  );

  useEffect(() => {
    obtenerTodasLasReservasDelAnio(selectedYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 animate-fade-left 
        ${active ? "" : "hidden"} `}
    >
      <Card className="flex flex-col md:min-w-[400px] md:min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Turnos Reservados
          </CardTitle>
          <CardDescription>
            Cantidad de turnos reservados durante el año.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={datosProcesados}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="reservas"
                type="natural"
                stroke="var(--color-reservas)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-reservas)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Periodo{" "}
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Enero a Diciembre - {selectedYear}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
