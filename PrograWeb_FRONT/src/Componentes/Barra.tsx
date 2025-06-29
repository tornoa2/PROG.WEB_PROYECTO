import { NavLink } from "react-router-dom";
import { cerrarSesion } from "../Utils/cerrar_sesion";

export default function Sidebar() {
  return (
    <div
      className="bg-secondary text-white p-3"
      style={{
        width: "200px",
        height: "100vh",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div className="text-center mb-4">
        <img
          src="/assets/pfp/Asa.png"
          alt="Usuario"
          className="bg-light rounded-circle mx-auto"
          style={{ width: 80, height: 80 }}
        />
        <p className="mt-2">Fernando</p>
      </div>
      <nav className="nav flex-column">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `nav-link px-2 py-2 text-nowrap text-truncate ${
              isActive ? "bg-light text-dark rounded" : "text-white"
            }`
          }
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/games"
          className={({ isActive }) =>
            `nav-link px-2 py-2 text-nowrap text-truncate ${
              isActive ? "bg-light text-dark rounded" : "text-white"
            }`
          }
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Juegos
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            `nav-link px-2 py-2 text-nowrap text-truncate ${
              isActive ? "bg-light text-dark rounded" : "text-white"
            }`
          }
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Noticias
        </NavLink>
        <NavLink
          to="/ganancias"
          className={({ isActive }) =>
            `nav-link px-2 py-2 text-nowrap text-truncate ${
              isActive ? "bg-light text-dark rounded" : "text-white"
            }`
          }
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Estadísticas
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link mt-4 px-2 py-2 text-nowrap text-truncate ${
              isActive ? "bg-light text-dark rounded" : "text-white"
            }`
          }
          onClick={cerrarSesion}
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          Salir
        </NavLink>
      </nav>
    </div>
  );
}
