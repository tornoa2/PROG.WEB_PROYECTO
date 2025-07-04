import { useState } from "react";
import Sidebar from "../Componentes/Barra";
import NavBar from "../Componentes/BarraNavegacion";
import TablaNoticias from "../Componentes/TablaNoticias";
import AgregarNoticia from "../Componentes/AgregarNoticia";
import EditarNoticia from "../Componentes/EditarNoticia";
import ModalEliminarNoticia from "../Componentes/EliminarNoticia";
import "../Estilos/vistaAdmin.css";

import type { Noticia } from "../Tipos/Noticia";

export default function VistaNoticias() {
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const [noticiaIdSeleccionada, setNoticiaIdSeleccionada] = useState<number | null>(null);

  const abrirModalAgregar = () => setModalAgregarAbierto(true);
  const cerrarModalAgregar = () => setModalAgregarAbierto(false);

  const abrirModalEditar = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => {
    setNoticiaSeleccionada(null);
    setModalEditarAbierto(false);
  };

  const abrirModalEliminar = (id: number) => {
    setNoticiaIdSeleccionada(id);
    setModalEliminarAbierto(true);
  };
  const cerrarModalEliminar = () => {
    setNoticiaIdSeleccionada(null);
    setModalEliminarAbierto(false);
  };

  const fetchNoticias = async () => {
    window.location.reload();
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex" style={{ marginTop: "60px" }}>
        <Sidebar />
        <main className="p-4 w-100">
          <h2>Gestor de Noticias</h2>
          <button
            className="btn btn-primary mb-3"
            onClick={abrirModalAgregar}
          >
            Agregar Noticia
          </button>

          <TablaNoticias
            abrirModalEditar={abrirModalEditar}
            abrirModalEliminar={abrirModalEliminar}
          />
          <AgregarNoticia
            show={modalAgregarAbierto}
            onHide={cerrarModalAgregar}
            fetchNoticias={fetchNoticias}
          />

          <EditarNoticia
            show={modalEditarAbierto}
            onHide={cerrarModalEditar}
            noticia={noticiaSeleccionada!}
            fetchNoticias={fetchNoticias}
          />

          {modalEliminarAbierto && noticiaIdSeleccionada !== null && (
            <ModalEliminarNoticia
              show={modalEliminarAbierto}
              onHide={cerrarModalEliminar}
              id={noticiaIdSeleccionada}
              fetchNoticias={fetchNoticias}
            />
          )}

          {/* En siguientes pasos agregaremos: */}
          {/* ModalAgregarNoticia modal abierto: {modalAgregarAbierto} */}
          {/* ModalEditarNoticia modal abierto: {modalEditarAbierto}, data: {noticiaSeleccionada} */}
          {/* ModalEliminarNoticia modal abierto: {modalEliminarAbierto}, id: {noticiaIdSeleccionada} */}
        </main>
      </div>
    </div>
  );
}