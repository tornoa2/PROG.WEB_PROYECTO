import { Modal } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import SubmitButton from "./Boton";
import { ListaGames } from "../Utils/ListaJuegos";

import "../Estilos/Modal.css";
import type { Game } from "../Tipos/Game";

interface ModalEliminarJuego {
  show: boolean;
  onHide: () => void;
  id: string;
}

export default function ModalEliminar({
  show,
  onHide,
  id,
}: ModalEliminarJuego) {
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    // aca poner que elimine
    //eliminarJuego(id);
    onHide();
  };

  return (
    <Modal
      className="modal"
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>¿Seguro que quiere eliminar este juego?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="row align-items-start">
              <button type="button" onClick={onHide} className="col btn btn-secondary mt-2 mb-2 w-100 ms-4 me-4">
                Cancelar
              </button>
              <SubmitButton label="Eliminar" className="col ms-4 me-4" />
            </div>
          </div>

          
        </form>
      </Modal.Body>
    </Modal>
  );
}
