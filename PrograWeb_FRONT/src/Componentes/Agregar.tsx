import { Modal } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import FormInput from "./Input";
import SubmitButton from "./Boton";
import { ListaGames } from "../Utils/ListaJuegos";

import "../Estilos/Modal.css";

interface ModalAgregarJuego {
  show: boolean;
  onHide: () => void;
}

export default function ModalAgregar({ show, onHide }: ModalAgregarJuego) {
  const [titulo1, setTitulo1] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState(0);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    console.log({ titulo1, description, precio });

    if (titulo1 !== "" && description !== "") {
      ListaGames.push({
        id: JSON.stringify(ListaGames.length + 1),
        titulo: titulo1,
        description,
        precio,
      });
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Agregar Juego</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Titulo"
            type="text"
            id="titulo1"
            value={titulo1}
            onChange={(e) => setTitulo1(e.currentTarget.value)}
          />
          <FormInput
            label="Descripcion"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <FormInput
            label="Precio"
            type="number"
            id="precio"
            value={"" + precio}
            onChange={(e) => setPrecio(Number(e.currentTarget.value))}
          />

          <label className="form-label mt-3">Género:</label>
          <select className="form-control mb-2">
            <option value="">Seleccione un género</option>
            <option value="Acción">Acción</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Estrategia">Estrategia</option>
          </select>

          <label className="form-label mt-3">Plataformas:</label>
          <div className="checkbox-group mb-3">
            <label className="me-3"><input type="checkbox" /> PC</label>
            <label className="me-3"><input type="checkbox" /> PS5</label>
            <label className="me-3"><input type="checkbox" /> Xbox Series X</label>
            <label><input type="checkbox" /> Nintendo Switch</label>
          </div>

          <FormInput
            label="Descuento"
            type="number"
            id="descuento"
            value=""
            onChange={() => {}}
          />

          <FormInput
            label="Fecha de lanzamiento"
            type="date"
            id="fecha"
            value=""
            onChange={() => {}}
          />

          <label className="form-label mt-3">Imagen:</label>
          <input className="form-control" type="file" disabled />

          <div className="mt-4">
            <SubmitButton label="Crear" />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="bg-dark text-white">
        {(titulo1 === "" || description === "") && (
          <button type="button" className="btn btn-danger">Faltan datos</button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
