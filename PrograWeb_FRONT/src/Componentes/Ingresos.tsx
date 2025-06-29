import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Enero", ganancia: 1100 },
  { mes: "Febrero", ganancia: 750 },
  { mes: "Marzo", ganancia: 780 },
  { mes: "Abril", ganancia: 1860 },
  { mes: "Mayo", ganancia: 1560 },
  { mes: "Junio", ganancia: 780 },
  { mes: "Julio", ganancia: 790 },
  { mes: "Agosto", ganancia: 1050 },
  { mes: "Septiembre", ganancia: 820 },
  { mes: "Octubre", ganancia: 810 },
  { mes: "Noviembre", ganancia: 910 },
  { mes: "Diciembre", ganancia: 450 },
];

export default function IngresosMensuales() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ganancia" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
