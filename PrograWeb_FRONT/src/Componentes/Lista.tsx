import type { Game } from "../Tipos/Game"
import { ListaGames } from "../Utils/ListaJuegos"
import GameCard from "./GameCard"



const GameList = () => {
    return (
        <div className="container mt-4 mb-4">
            <h1 className="mb-4">Mejor Puntuados por la comunidad</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {ListaGames.map((e: Game) => (
                    <GameCard
                        id={e.id}
                        precio={e.precio}
                        image={e.image}
                        titulo={e.titulo}
                        description={e.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default GameList
