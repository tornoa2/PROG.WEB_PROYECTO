import { Modal } from "react-bootstrap";
import { useState, useEffect, type FormEvent } from "react";
import FormInput from "./Input";
import SubmitButton from "./Boton";
// import { ListaGames } from "../Utils/ListaJuegos";

import "../Estilos/Modal.css";

interface ModalAgregarJuego {
  show: boolean;
  onHide: () => void;
  fetchGames: () => Promise<void>;
}

export default function ModalAgregar({ show, onHide, fetchGames }: ModalAgregarJuego) {
  const [titulo1, setTitulo1] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState(0);
  
  const [categorias, setCategorias] = useState<{ id: number, nombre: string }[]>([]);
  const [categoriaId, setCategoriaId] = useState<number | "">("");

  const [plataformas, setPlataformas] = useState<{ id: number, nombre: string }[]>([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState<number[]>([]);

  const [fechaLanzamiento, setFechaLanzamiento] = useState("");

  const [descuento, setDescuento] = useState(0);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      // Validación básica
      if (titulo1 === "" || description === "" || precio <= 0 || !categoriaId || fechaLanzamiento === "") {
        console.error("Faltan datos obligatorios.");
        return;
      }

      const juegoData = {
        titulo: titulo1,
        description,
        precio,
        categoriaId,
        releaseDate: fechaLanzamiento,
        plataformasSeleccionadas,
        descuento,
      };

      const response = await fetch("http://localhost:5000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(juegoData),
      });

      if (response.ok) {
        console.log("Juego creado correctamente");
        await fetchGames();
        onHide(); // cerrar modal
      } else {
        console.error("Error al crear el juego:", await response.json());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };


  /* ENDPOINT CATEGORIAS */
  useEffect(() => {
  const fetchCategorias = async () => {
    try {
      const response = await fetch("http://localhost:5000/categorias");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  fetchCategorias();
}, []);

  /* ENDPOINT PLATAFORMAS */
  useEffect(() => {
  const fetchPlataformas = async () => {
    try {
      const response = await fetch("http://localhost:5000/plataformas");
      const data = await response.json();
      setPlataformas(data);
    } catch (error) {
      console.error("Error al obtener plataformas:", error);
    }
  };

  fetchPlataformas();
}, []);


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
          <select
            className="form-control mb-2"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.currentTarget.value ? Number(e.currentTarget.value) : "")}
          >
            <option value="">Seleccione un género</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <label className="form-label mt-3">Plataformas:</label>
          <div className="checkbox-group mb-3">
            {plataformas.map((plataforma) => (
              <label key={plataforma.id} className="me-3">
                <input
                  type="checkbox"
                  value={plataforma.id}
                  checked={plataformasSeleccionadas.includes(plataforma.id)}
                  onChange={(e) => {
                    const id = Number(e.currentTarget.value);
                    setPlataformasSeleccionadas((prev) =>
                      prev.includes(id)
                        ? prev.filter((pid) => pid !== id)
                        : [...prev, id]
                    );
                  }}
                />{" "}
                {plataforma.nombre}
              </label>
            ))}
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
          <input className="form-control" type="file"/>

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
