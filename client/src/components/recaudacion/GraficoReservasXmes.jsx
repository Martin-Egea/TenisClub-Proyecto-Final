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
  const { reservas } = useReserva();

  const datosProcesados = contarReservasPorMes(reservas, meses);

  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 animate-fade-left 
        ${active ? "" : "hidden"} `}
    >
      <Card className="md:min-w-[400px] mr-3">
        <CardHeader>
          <CardTitle>Turnos Reservados por mes</CardTitle>
          <CardDescription>
            Cantidad de turnos reservados a la fecha.
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
                Enero a Diciembre - {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
