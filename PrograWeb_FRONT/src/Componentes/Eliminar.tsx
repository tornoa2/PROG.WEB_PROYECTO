import { Modal } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import SubmitButton from "./Boton";
// import { ListaGames } from "../Utils/ListaJuegos";

import "../Estilos/Modal.css";
// import type { Game } from "../Tipos/Game";

interface ModalEliminarJuego {
  show: boolean;
  onHide: () => void;
  id: string;
  fetchGames: () => Promise<void>;
}

export default function ModalEliminar({
  show,
  onHide,
  id,
  fetchGames
}: ModalEliminarJuego) {
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/games/${id}/ocultar`, {
        method: "PATCH",
      });

      if (response.ok) {
        console.log("Juego ocultado correctamente");
        await fetchGames();
        onHide();
      } else {
        console.error("Error al ocultar el juego");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
