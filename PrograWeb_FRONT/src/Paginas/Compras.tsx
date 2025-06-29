import { useState } from "react";
import GameCard2 from "../Componentes/GameCard";
import NavBar from "../Componentes/BarraNavegacion";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListaGames } from "../Utils/ListaJuegos";
import CarouselBestSellers from "../Componentes/CarruselSeller";

export default function BestSellers() {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<null | {
    titulo: string;
    description: string;
    image?: string;
  }>(null);

  return (
    <>
      <NavBar />
      <div className="bg-white text-dark">
        <div className="container mt-5">
          <br></br>
          <h2 className="mb-4">Los màs vendidos</h2>

          <CarouselBestSellers />

          <div
            className="row row-cols-2 row-cols-md-5 g-4"
            id="games-list"
          ></div>

          <div className="container text-center">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {ListaGames.map((game) => (
                <GameCard2
                  id={game.id}
                  key={game.titulo}
                  titulo={game.titulo}
                  description={game.description}
                  image={game.image}
                  videoURL={game.videoURL}
                  detalleImagenes={game.detalleImagenes} 
                  precio={game.precio}                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {juegoSeleccionado && (
        <Modal
          show
          onHide={() => setJuegoSeleccionado(null)}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-white text-dark">
            <Modal.Title>{juegoSeleccionado.titulo}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-white text-dark">
            {/* Video del juego */}
            <div className="mb-3">
              <video width="100%" controls poster={juegoSeleccionado.image}>
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta video HTML5.
              </video>
            </div>

            {/* Imágenes de gameplay en scroll horizontal */}
            <div className="d-flex overflow-auto gap-2 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i}/150`}
                  alt="Gameplay"
                  className="rounded"
                />
              ))}
            </div>

            {/* Descripción del juego */}
            <div className="mb-3">
              <p>{juegoSeleccionado.description}</p>
            </div>

            {/* Calificación del juego */}
            <div className="mb-3">
              <p className="mb-1">Calificación:</p>
              <p>⭐⭐⭐⭐☆</p>
              <div className="row">
                <Button variant="success" className="col btn btn-success ms-4 me-4">
                  👍 Buen Juego
                </Button>
                <Button variant="danger" className="col me-auto">👎 Mal Juego</Button>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="bg-dark">
            <Button variant="primary"className="mx-auto p-2 btn btn-primary">Comprar Ahora</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
