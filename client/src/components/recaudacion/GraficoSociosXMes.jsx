/* eslint-disable react/prop-types */
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUser } from "../../context/UserContext";
import { mesFormateado } from "@/utils/formatearDatos";
import { useReserva } from "@/context/ReservaContext";

const chartConfig = {
  usuarios: {
    label: "Usuarios",
    color: "hsl(var(--chart-1))",
  },
  socios: {
    label: "Socios",
    color: "hsl(var(--chart-2))",
  },
};

// Función para procesar datos
const datosDeCuotasProcesadas = (year, cuotasSociales, allUsers) => {
  const result = {};

  // Inicializar todos los meses del año en el resultado
  const meses = Array.from({ length: 12 }, (_, i) =>
    new Date(year, i, 1).toISOString().slice(0, 7)
  );

  meses.forEach((mes) => {
    result[mes] = { socios: 0, usuarios: 0 };
  });

  // Crear un mapa de cuotas por usuario y mes
  const cuotasPorUsuario = new Map();

  cuotasSociales.forEach((cuota) => {
    const { mes, socio, revisado, importe } = cuota;

    if (!cuotasPorUsuario.has(socio._id)) {
      cuotasPorUsuario.set(socio._id, {});
    }

    if (!cuotasPorUsuario.get(socio._id)[mes]) {
      cuotasPorUsuario.get(socio._id)[mes] = [];
    }

    cuotasPorUsuario.get(socio._id)[mes].push({ revisado, importe });
  });

  // Procesar cuotas sociales para determinar "socios" y "usuarios"
  allUsers.forEach((user) => {
    meses.forEach((mes) => {
      const cuotasMes = cuotasPorUsuario.get(user._id)?.[mes] || [];

      // Verificar si el usuario tiene cuotas revisadas y con un importe válido
      const tieneCuotaValida = cuotasMes.some(
        (cuota) => cuota.revisado && Number(cuota.importe) > 0
      );

      if (tieneCuotaValida) {
        result[mes].socios += 1;
      } else {
        // Considerar usuarios que no abonaron o no fueron revisados
        result[mes].usuarios += 1;
      }
    });
  });

  // Transformar el resultado en un array para el gráfico
  return Object.keys(result)
    .sort()
    .map((mes) => ({
      month: mesFormateado(mes), // Formatear el mes
      usuarios: result[mes].usuarios,
      socios: result[mes].socios,
    }));
};

export function GraficoSociosXmes({ active }) {
  const { cuotasSociales, allUsers } = useUser();
  const { selectedYear } = useReserva();

  const datosProcesados = datosDeCuotasProcesadas(
    selectedYear,
    cuotasSociales,
    allUsers
  );

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
          <CardTitle>
            <div className="flex gap-1 text-xl md:text-2xl">
              <div>Socios </div>
              <div className="text-orange-600"> inactivos</div>
              <div>vs </div>
              <div className="text-green-600"> activos</div>
            </div>
          </CardTitle>
          <CardDescription>Cantidad de socios activos por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={datosProcesados}
              margin={{
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillusuarios" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-usuarios)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-usuarios)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillsocios" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-socios)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-socios)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="socios"
                type="natural"
                fill="url(#fillsocios)"
                fillOpacity={0.4}
                stroke="var(--color-socios)"
                stackId="a"
              />
              <Area
                dataKey="usuarios"
                type="natural"
                fill="url(#fillusuarios)"
                fillOpacity={0.4}
                stroke="var(--color-usuarios)"
                stackId="a"
              />
              <ChartLegend
                content={<ChartLegendContent />}
                className="md:text-lg"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
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
