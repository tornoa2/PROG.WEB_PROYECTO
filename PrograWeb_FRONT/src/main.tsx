import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cuenta from "./Paginas/Cuenta"
import Sesion from "./Paginas/Sesion"
import Perfil from "./Paginas/Perfil"
import PaginaPrincipal from "./Paginas/PaginaPrincipal"
import Ganancias from "./Paginas/Ganancias"
import ValorJuegos from "./Paginas/ValorJuegos"
import Compras from "./Paginas/Compras"
import Carrito from "./Paginas/Carrito"
import Usuario from "./Paginas/Usuario"
import Admin from "./Paginas/Admin"
import Noticias from "./Paginas/Noticias"
import Contra from "./Paginas/Contra"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/crear_cuenta" element={<Cuenta />} />
        <Route path="/iniciar_sesion" element={<Sesion />} />
        <Route path="/top-rated" element={<ValorJuegos />} />
        <Route path="/best-sellers" element={<Compras />} />
        <Route path="/ganancias" element={<Ganancias />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/users" element={<Usuario />} />
        <Route path="/games" element={<Admin />} />
        <Route path="/news" element={<Noticias />} />
        <Route path="cambio-contra" element={<Contra />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
