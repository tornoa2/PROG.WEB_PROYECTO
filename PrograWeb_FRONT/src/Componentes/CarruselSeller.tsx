import { ListaGames } from "../Utils/ListaJuegos";
import "../Estilos/carousel.css";

export default function CarouselBestSellers() {
  return (
    <div className="container">
      <div
        id="carouselSection"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {ListaGames.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselSection"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {ListaGames.map((game, index) => (
            <div
              key={game.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={game.image}
                className="d-block w-100"
                style={{ height: "400px", objectFit: "contain" }}
                alt={game.titulo}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselSection"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previo</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselSection"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}
