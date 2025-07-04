import { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import type { Noticia } from "../Tipos/Noticia";

interface TablaNoticiasProps {
  abrirModalEditar: (noticia: Noticia) => void;
  abrirModalEliminar: (noticiaId: number) => void;
}

export default function TablaNoticias({
  abrirModalEditar,
  abrirModalEliminar,
}: TablaNoticiasProps) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [error, setError] = useState(false);

  const fetchNoticias = async () => {
    try {
      const response = await fetch("http://localhost:5000/news");
      const data = await response.json();
      setNoticias(data);
    } catch (err) {
      console.error("Error al obtener noticias:", err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return (
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
                <th>Subtítulo</th>
                <th>Fecha de publicación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((noticia, index) => (
                <tr key={noticia.id}>
                  <td>{index + 1}</td>
                  <td>{noticia.titulo}</td>
                  <td>{noticia.subtitulo ?? "-"}</td>
                  <td>
                    {noticia.fecha_publicacion
                      ? new Date(noticia.fecha_publicacion).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {noticia.activo ? (
                      <span className="badge bg-success">Activo</span>
                    ) : (
                      <span className="badge bg-danger">Inactivo</span>
                    )}
                  </td>
                  <td>
                    <BsFillPencilFill
                      className="me-2 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => abrirModalEditar(noticia)}
                    />
                    <BsFillTrashFill
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => abrirModalEliminar(noticia.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}