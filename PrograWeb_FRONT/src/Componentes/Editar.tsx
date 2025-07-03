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

  const [categorias, setCategorias] = useState<{ id: number, nombre: string }[]>([]);
  const [categoriaId, setCategoriaId] = useState<number | "">("");

  const [plataformas, setPlataformas] = useState<{ id: number, nombre: string }[]>([]);
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState<number[]>([]);

  // Cargar datos iniciales del juego
  useEffect(() => {
    if (juego) {
      setTitulo1(juego.titulo);
      setDescription(juego.description ?? "");
      setPrecio(juego.precio ?? 0);
      setDescuento(juego.descuento ?? 0);
      setFechaLanzamiento(juego.releaseDate ? juego.releaseDate.substring(0, 10) : "");
      setCategoriaId(juego.categoria_id ?? "");

      // Si tu objeto juego ya trae las plataformas asociadas como IDs:
      if (juego.plataformas) {
        const ids = juego.plataformas.map((p: any) => p.platformId);
        setPlataformasSeleccionadas(ids);
      }
    }
  }, [juego]);

  // Obtener categorías desde backend
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

  // Obtener plataformas desde backend
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

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (titulo1 !== "" && description !== "") {
      const juegoActualizado = {
        titulo: titulo1,
        description,
        precio,
        descuento,
        releaseDate: fechaLanzamiento,
        categoriaId, // mantener en camelCase, mapear en backend
        plataformasSeleccionadas,
      };

      try {
        const response = await fetch(`http://localhost:5000/games/${juego.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(juegoActualizado),
        });

        if (response.ok) {
          console.log("Juego editado correctamente");
          await fetchGames();
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
          <select
            className="form-control mb-2"
            value={categoriaId}
            onChange={(e) =>
              setCategoriaId(e.currentTarget.value ? Number(e.currentTarget.value) : "")
            }
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