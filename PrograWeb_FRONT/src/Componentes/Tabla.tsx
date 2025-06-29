import { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "../Estilos/Table.css";

import { ListaGames } from "../Utils/ListaJuegos";
import type { Game } from "../Tipos/Game";
import ModalAgregar from "./Agregar";
import ModalEliminar from "./Eliminar";
import ModalEditar from "./Editar";

export const Table = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const [modalAbierto2, setModalAbierto2] = useState(false);
  const abrirModal2 = () => setModalAbierto2(true);
  const cerrarModal2 = () => setModalAbierto2(false);

  const [modalAbierto3, setModalAbierto3] = useState(false);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<Game | null>(null);
  const abrirModal3 = (juego: Game) => {
    setJuegoSeleccionado(juego);
    setModalAbierto3(true);
  };
  const cerrarModal3 = () => setModalAbierto3(false);

  return (
    <div className="table-wrapper">
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-de-tabla"
          type="button"
          onClick={abrirModal}
        >
          Agregar
        </button>

        {modalAbierto && (
          <ModalAgregar show={modalAbierto} onHide={cerrarModal} />
        )}
      </div>

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th className="expandesque">Título</th>
            <th>Género</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Precio de Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ListaGames.map((juego: Game) => (
            <tr key={juego.id}>
              <td>{juego.id}</td>
              <td className="expandesque">{juego.titulo}</td>
              <td>{juego.categoria?.nombre ?? "-"}</td>
              <td>{juego.precio}</td>
              <td>0</td>
              <td>{juego.precio}</td>
              <td className="fit">
                <span className="actions">
                  <BsFillTrashFill
                    className="delete-btn"
                    onClick={abrirModal2}
                  />
                  {modalAbierto2 && (
                    <ModalEliminar
                      show={modalAbierto2}
                      onHide={cerrarModal2}
                      id={juego.id}
                    />
                  )}

                  <BsFillPencilFill
                    className="edit-btn"
                    onClick={() => abrirModal3(juego)}
                  />
                  {modalAbierto3 && juegoSeleccionado && (
                    <ModalEditar
                      show={modalAbierto3}
                      onHide={cerrarModal3}
                      juego={juegoSeleccionado}
                    />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
