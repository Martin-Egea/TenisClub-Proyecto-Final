export const importeFormateado = (importe) => {
  const importeConDecimales = parseFloat((importe * 100).toFixed(2)) / 100;
  return importeConDecimales.toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
  });
};

export const mesFormateado = (mes) => {
  const [year, month] = mes.split("-");
  const mesFormateado = new Date(year, month - 1).toLocaleString("es-ES", {
    month: "short",
    year: "numeric",
  });
  return mesFormateado.replace(/(\d+) (\w+)/, "$2 $1");
};
