/* eslint-disable react/prop-types */
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useMemo } from "react";
import { useUser } from "../context/UserContext";

const formatearMes = (mes) => {
  const [year, month] = mes.split("-");
  const mesFormateado = new Date(year, month - 1).toLocaleString("es-ES", {
    month: "short",
  });
  return mesFormateado === "septiembre" ? "sept" : mesFormateado;
};

const mesesOrdenados = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sept",
  "oct",
  "nov",
  "dic",
];

export default function GraficoRegistroSocios({ active }) {
  const { cuotasSociales } = useUser();

  const datosProcesados = useMemo(() => {
    const añoActual = new Date().getFullYear();
    const datosIniciales = mesesOrdenados.map((mes) => ({ mes, total: 0 }));

    const datosAgrupados = cuotasSociales
      .filter((cuota) => cuota.revisado)
      .reduce((acc, cuota) => {
        const [año] = cuota.mes.split("-");
        if (año === añoActual.toString()) {
          const mesFormateado = formatearMes(cuota.mes);
          const index = mesesOrdenados.indexOf(mesFormateado);
          if (index !== -1) {
            acc[index].total += parseInt(cuota.importe, 10);
          }
        }
        return acc;
      }, datosIniciales);

    return datosAgrupados;
  }, [cuotasSociales]);

  return (
    <div
      className={`flex justify-center items-center mx-auto p-4 min-h-[500px] min-w-[500px] animate-fade-left 
        ${active ? "" : "hidden"} `}
      style={{ minWidth: 500, minHeight: 500 }}
    >
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Registro de Socios por Mes</CardTitle>
          <CardDescription>
            Suma de importes de cuotas sociales registradas en el año actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              total: {
                label: "Total de Cuotas",
                color: "hsl(var(--primary))",
              },
            }}
          >
            <BarChart
              data={datosProcesados}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="mes"
                tickFormatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  }).format(value)
                }
                labelFormatter={(label) =>
                  label.charAt(0).toUpperCase() + label.slice(1)
                }
              />
              <Bar dataKey="total" fill="var(--color-total)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
