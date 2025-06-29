import { Modal, Button } from "react-bootstrap"
import type { Game } from "../Tipos/Game"

interface ModalJuegoProps {
    show: boolean
    onHide: () => void
    juego: Game
}

export default function ModalJuego({ show, onHide, juego }: ModalJuegoProps) {
    const { titulo, description, videoURL, detalleImagenes, precio } = juego
    console.log(precio)

    return (
        <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark text-white">
                <div className="mb-3">
                    <iframe
                        width="100%"
                        height="400"
                        src={videoURL}
                        title={titulo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="d-flex overflow-auto gap-2 mb-3">
                    {detalleImagenes?.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`img-${idx}`}
                            className="rounded"
                            width={150}
                        />
                    ))}
                </div>

                <p>{description}</p>

                <p>{precio}</p>

                <div className="mb-3">
                    <p>Calificación:</p>
                    <p>⭐⭐⭐⭐☆</p>

                    <div>
                        <div className="row">
                            
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="bg-dark">
                <Button variant="primary" className="mx-auto p-2">
                    Comprar Ahora
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
