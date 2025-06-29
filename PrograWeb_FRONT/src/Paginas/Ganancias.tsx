import IngresosMensuales from "../Componentes/Ingresos";
import NavBar from "../Componentes/BarraNavegacion";
import Sidebar from "../Componentes/Barra";
import UserCard from "../Componentes/TarjetasUsadas";

export default function Ganancias() {
  return (
    <div>
      <NavBar />
      <div className="d-flex" style={{ marginTop: "60px"}}>
        <Sidebar/>
        <main className="p-4 w-100">
          <h2>Ganancias</h2>

          <div className="my-4">
            <UserCard totalUsers={120} />
          </div>

          <div>
            <h5>Ganancias x mes</h5>
            <IngresosMensuales />
          </div>
        </main>
      </div>
    </div>
  );
}
