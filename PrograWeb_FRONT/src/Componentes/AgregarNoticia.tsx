import { Modal } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import FormInput from "./Input";
import SubmitButton from "./Boton";

import "../Estilos/Modal.css";

interface ModalAgregarNoticiaProps {
  show: boolean;
  onHide: () => void;
  fetchNoticias: () => Promise<void>;
}

export default function AgregarNoticia({
  show,
  onHide,
  fetchNoticias,
}: ModalAgregarNoticiaProps) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [activo, setActivo] = useState(true);

  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (titulo === "" || cuerpo === "") {
      console.error("Faltan datos obligatorios.");
      return;
    }

    try {
      const noticiaData = {
        titulo,
        subtitulo,
        cuerpo,
        fecha_publicacion: fechaPublicacion ? new Date(fechaPublicacion) : new Date(),
        etiquetas: etiquetas.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
        activo,
      };

      // Si luego integras upload de imagen al backend:
      // const formData = new FormData();
      // formData.append("imagen", imagenFile as Blob);
      // formData.append("data", JSON.stringify(noticiaData));

      const response = await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticiaData),
      });

      if (response.ok) {
        console.log("Noticia creada correctamente");
        await fetchNoticias();
        onHide();
      } else {
        console.error("Error al crear la noticia:", await response.json());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Agregar Noticia</Modal.Title>
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
                rows={8} // más alto
                style={{ resize: "vertical", maxHeight: "300px", overflowY: "auto" }}
                placeholder="Escribe aquí el cuerpo completo de la noticia..."
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

          <label className="form-label mt-3">Imagen:</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setImagenFile(e.target.files ? e.target.files[0] : null)}
          />

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.currentTarget.checked)}
              id="activo"
            />
            <label className="form-check-label" htmlFor="activo">
              Activo
            </label>
          </div>

          <div className="mt-4">
            <SubmitButton label="Crear" />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="bg-dark text-white">
        {(titulo === "" || cuerpo === "") && (
          <button type="button" className="btn btn-danger">Faltan datos</button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
