/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

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

export function GraficoOcupacionCanchas({ active }) {
  const { reservas, canchas } = useReserva();
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [totalReservas, setTotalReservas] = useState(0);

  const generateDynamicColor = (index) => {
    const hue = (index * 360) / canchas.length; // Espaciado uniforme de colores
    return `hsl(${hue + 120}, 80%, 50%)`; // Saturación y luminosidad ajustadas
  };

  useEffect(() => {
    if (!reservas.length || !canchas.length) return;

    // Contar reservas por cancha
    const reservasPorCancha = reservas.reduce((acc, reserva) => {
      acc[reserva.id_cancha] = (acc[reserva.id_cancha] || 0) + 1;
      return acc;
    }, {});

    // Calcular total de reservas
    const total = reservas.length;
    setTotalReservas(total);

    // Preparar datos para el gráfico y la configuración
    const data = [];
    const config = {};

    canchas.forEach((cancha, index) => {
      const cantidadReservas = reservasPorCancha[cancha._id] || 0;
      const porcentaje = (cantidadReservas / total) * 100;
      const colorKey = `cancha${index + 1}`;

      // Datos para el gráfico
      data.push({
        nombre: cancha.nombre + " - ",
        porcentaje: parseFloat(porcentaje.toFixed(1)),
        fill: generateDynamicColor(index),
      });

      // Configuración del gráfico
      config[colorKey] = {
        label: cancha.nombre,
        color: `hsl(var(--chart-${index + 1}))`,
      };
    });

    setChartData(data);
    setChartConfig(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservas, canchas]);

  if (!active) {
    return null;
  }

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 animate-fade-left 
      ${active ? "" : "hidden"} `}
    >
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Ocupación de canchas</CardTitle>
          <CardDescription>
            Preferencia de canchas para {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[300px] min-w-[410px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(value) => `${value}%`}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="porcentaje"
                nameKey="nombre"
                outerRadius={80}
                label={({ cx, cy, midAngle, outerRadius, value, name }) => {
                  const RADIAN = Math.PI / 180;
                  // Aumentar el radio para mover la etiqueta hacia afuera
                  const radius = outerRadius * 1.2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="currentColor"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-sm font-medium"
                    >
                      {`${name} ${value}%`}
                    </text>
                  );
                }}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total de reservas: {totalReservas}
          </div>
          <div className="leading-none text-muted-foreground">
            Distribución de reservas por cancha
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
