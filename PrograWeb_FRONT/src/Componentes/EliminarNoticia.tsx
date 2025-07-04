import { Modal } from "react-bootstrap";
import { type FormEvent } from "react";
import SubmitButton from "./Boton";

interface ModalEliminarNoticiaProps {
  show: boolean;
  onHide: () => void;
  id: number;
  fetchNoticias: () => Promise<void>;
}

export default function ModalEliminarNoticia({
  show,
  onHide,
  id,
  fetchNoticias
}: ModalEliminarNoticiaProps) {
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/news/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Noticia eliminada correctamente");
        await fetchNoticias();
        onHide();
      } else {
        console.error("Error al eliminar la noticia");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>¿Seguro que desea eliminar esta noticia?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-start">
            <button type="button" onClick={onHide} className="col btn btn-secondary mt-2 mb-2 w-100 ms-4 me-4">
              Cancelar
            </button>
            <SubmitButton label="Eliminar" className="col ms-4 me-4" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}