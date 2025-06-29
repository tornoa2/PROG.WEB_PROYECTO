import { useState } from "react"
import { Button } from "react-bootstrap"
import ModalJuego from "./Juego"
import type { Game } from "../Tipos/Game"

export default function GameCard(game: Game) {
    const [mostrarModal, setMostrarModal] = useState(false)
    const { image, titulo, description } = game

    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <img src={image} className="card-img-top" alt={titulo} />
                    <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="card-title">{titulo}</h5>
                            <p className="card-text">{description}</p>
                        </div>
                        <div className="mt-auto">
                            <Button
                                className="w-100 mt-2"
                                onClick={() => setMostrarModal(true)}
                            >
                                Detalle
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalJuego
                show={mostrarModal}
                onHide={() => setMostrarModal(false)}
                juego={game}
            />
        </>
    )
}
