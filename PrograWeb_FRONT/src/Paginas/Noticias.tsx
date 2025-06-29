import { useEffect, useState } from "react";
import Sidebar from "../Componentes/Barra";
import NavBar from "../Componentes/BarraNavegacion";
import "../Estilos/vistaAdmin.css";

const API_KEY_NEWS = "843615a3265647d0a44982ded9ceb2ba";

interface Noticia {
  title: string;
  description: string;
}

export default function VistaNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=videojuegos&language=es&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY_NEWS}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          const noticiasFiltradas = data.articles.map((articulo: any) => ({
            title: articulo.title,
            description: articulo.description || "Sin descripción disponible",
          }));
          setNoticias(noticiasFiltradas);
        } else {
          setNoticias([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setError(true);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="d-flex" style={{ marginTop: "60px" }}>
        <Sidebar />
        <main className="p-4 w-100">
          <h2>Gestor de Noticias</h2>
          <div className="card-body">
            <div className="table-responsive">
              {error ? (
                <p>Error al cargar noticias.</p>
              ) : noticias.length === 0 ? (
                <p>No se encontraron noticias.</p>
              ) : (
                <table className="table align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticias.map((noticia, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{noticia.title}</td>
                        <td>{noticia.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
