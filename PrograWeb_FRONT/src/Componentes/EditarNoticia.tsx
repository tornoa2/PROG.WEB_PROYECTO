import { Modal } from "react-bootstrap";
import { useEffect, useState, type FormEvent } from "react";
import FormInput from "./Input";
import SubmitButton from "./Boton";

import "../Estilos/Modal.css";
import type { Noticia } from "../Tipos/Noticia";

interface ModalEditarNoticiaProps {
  show: boolean;
  onHide: () => void;
  noticia: Noticia;
  fetchNoticias: () => Promise<void>;
}

export default function ModalEditarNoticia({
  show,
  onHide,
  noticia,
  fetchNoticias,
}: ModalEditarNoticiaProps) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (noticia) {
      setTitulo(noticia.titulo);
      setSubtitulo(noticia.subtitulo ?? "");
      setCuerpo(noticia.cuerpo ?? "");
      setFechaPublicacion(
        noticia.fecha_publicacion
          ? noticia.fecha_publicacion.substring(0, 10)
          : ""
      );
      setEtiquetas(noticia.etiquetas ? noticia.etiquetas.join(", ") : "");
      setActivo(noticia.activo);
    }
  }, [noticia]);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (titulo !== "" && cuerpo !== "") {
      const noticiaActualizada = {
        titulo,
        subtitulo,
        cuerpo,
        fecha_publicacion: fechaPublicacion ? new Date(fechaPublicacion) : new Date(),
        etiquetas: etiquetas.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
        activo,
      };

      try {
        const response = await fetch(`http://localhost:5000/news/${noticia.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaActualizada),
        });

        if (response.ok) {
          console.log("Noticia editada correctamente");
          await fetchNoticias();
          onHide();
        } else {
          console.error("Error al editar noticia:", await response.json());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Editar Noticia</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Título"
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.currentTarget.value)}
          />
          <FormInput
            label="Subtítulo"
            type="text"
            id="subtitulo"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.currentTarget.value)}
          />

          <div className="mb-3">
            <label htmlFor="cuerpo" className="form-label">Cuerpo</label>
            <textarea
              id="cuerpo"
              className="form-control"
              value={cuerpo}
              onChange={(e) => setCuerpo(e.currentTarget.value)}
              rows={8}
              style={{ resize: "vertical", maxHeight: "300px", overflowY: "auto" }}
              placeholder="Escribe aquí el contenido completo de la noticia..."
            ></textarea>
          </div>

          <FormInput
            label="Fecha de Publicación"
            type="date"
            id="fechaPublicacion"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.currentTarget.value)}
          />

          <FormInput
            label="Etiquetas (separadas por comas)"
            type="text"
            id="etiquetas"
            value={etiquetas}
            onChange={(e) => setEtiquetas(e.currentTarget.value)}
          />

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.currentTarget.checked)}
            />
            <label className="form-check-label" htmlFor="activo">
              Activo
            </label>
          </div>

          <div className="mt-4">
            <SubmitButton label="Guardar" />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="bg-dark text-white">
        {(titulo === "" || cuerpo === "") && (
          <button type="button" className="btn btn-danger">
            Faltan datos
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}