import { Modal } from "react-bootstrap";
import { useEffect, useState, type FormEvent } from "react";
import FormInput from "./Input";
import SubmitButton from "./Boton";

import "../Estilos/Modal.css";
import type { Game } from "../Tipos/Game";

interface ModalEditarJuego {
  show: boolean;
  onHide: () => void;
  juego: Game;
  fetchGames: () => Promise<void>;
}

export default function ModalEditar({ show, onHide, juego, fetchGames }: ModalEditarJuego) {
  const [titulo1, setTitulo1] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState(0);

  const [descuento, setDescuento] = useState(0);
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");

  useEffect(() => {
    if (juego) {
      setTitulo1(juego.titulo);
      setDescription(juego.description ?? "");
      setPrecio(juego.precio ?? 0);
      setDescuento(juego.descuento ?? 0);
      setFechaLanzamiento(juego.releaseDate ? juego.releaseDate.substring(0, 10) : "");
    }
  }, [juego]);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (titulo1 !== "" && description !== "") {
      const juegoActualizado = {
        titulo: titulo1,
        description,
        precio,
        descuento,
        releaseDate: fechaLanzamiento,
      };

      try {
        const response = await fetch(`http://localhost:5000/games/${juego.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(juegoActualizado),
        });

        if (response.ok) {
          console.log("Juego editado correctamente");
          await fetchGames(); // si lo pasas como prop para refrescar la tabla
          onHide();
        } else {
          console.error("Error al editar juego:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Editar Juego</Modal.Title>
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
          <select className="form-control mb-2" disabled>
            <option>Seleccione un género</option>
            <option>Acción</option>
            <option>Aventura</option>
            <option>RPG</option>
            <option>Estrategia</option>
          </select>

          <label className="form-label mt-3">Plataformas:</label>
          <div className="checkbox-group mb-3">
            <label className="me-3"><input type="checkbox" disabled /> PC</label>
            <label className="me-3"><input type="checkbox" disabled /> PS5</label>
            <label className="me-3"><input type="checkbox" disabled /> Xbox Series X</label>
            <label><input type="checkbox" disabled /> Nintendo Switch</label>
          </div>

          <FormInput
            label="Descuento"
            type="number"
            id="descuento"
            value={descuento.toString()}
            onChange={(e) => setDescuento(Number(e.currentTarget.value))}
          />

          <FormInput
            label="Fecha de lanzamiento"
            type="date"
            id="fecha"
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.currentTarget.value)}
          />

          <label className="form-label mt-3">Imagen:</label>
          <input className="form-control" type="file" disabled />

          <div className="mt-4">
            <SubmitButton label="Guardar" />
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
