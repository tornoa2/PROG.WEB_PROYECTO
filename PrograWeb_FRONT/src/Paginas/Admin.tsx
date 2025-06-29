import Sidebar from "../Componentes/Barra";
import { Table } from "../Componentes/Tabla";
import NavBar from "../Componentes/BarraNavegacion";
import "../Estilos/vistaAdmin.css";
import "../Estilos/Modal.css";

export default function VistaAdmin() {
  return (
    <div>
      <NavBar />
      <div className="d-flex" style={{ marginTop: "60px" }}>
        <Sidebar />
        <main className="p-4 w-100">
          <h2>Gestor de Juegos</h2>
          <div className="card-body">
            <div className="table-responsive">
              <Table />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
