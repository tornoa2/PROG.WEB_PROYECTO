import type { Game } from "../Tipos/Game";

export const ListaGames: Game[] = [
  {
    id: "1",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
    titulo: "The Legend of Zelda: Breath of the Wild",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/zw47_q9wbBE",
    detalleImagenes: [
      "/assests/complementos/zelda.jpg",
      "/assests/complementos/zelda2.jpg",
      "/assests/complementos/zelda3.jpg"
    ],
    rating: 9.7,
    precio: 59.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "2",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    titulo: "Elden Ring",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/E3Huy2cdih0",
    detalleImagenes: [
      "/assests/complementos/eldenring.jpg",
      "/assests/complementos/eldenring2.jpg",
      "/assests/complementos/eldenring3.jpg"
    ],
    rating: 9.6,
    precio: 59.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "3",
    image: "https://i.3djuegos.com/juegos/17544/god_of_war_ragnarok/fotos/ficha/god_of_war_ragnarok-5732812.jpg",
    titulo: "God of War: Ragnarok",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/EE-4GvjKcfs",
    detalleImagenes: [
      "/assests/complementos/gow.jpg",
      "/assests/complementos/gow2.jpg",
      "/assests/complementos/gow3.jpg"
    ],
    rating: 9.5,
    precio: 69.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "4",
    image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    titulo: "Red Dead Redemption 2",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/eaW0tYpxyp0",
    detalleImagenes: [
      "/assests/complementos/rdr2.jpg",
      "/assests/complementos/rdr23.jpg",
      "/assests/complementos/rdr22.jpg"
    ],
    rating: 9.5,
    precio: 39.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "5",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    titulo: "The Witcher 3: Wild Hunt",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/c0i88t0Kacs?si=aMNNYdTUCCmdppIK",
    detalleImagenes: [
      "/assests/complementos/thw1.jpg",
      "/assests/complementos/thw2.jpg",
      "/assests/complementos/thw3.jpg"
    ],
    rating: 9.4,
    precio: 29.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "6",
    image: "https://m.media-amazon.com/images/I/71FjVhf-SlL.jpg",
    titulo: "Hades",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/91t0ha9x0AE?si=CJSF8s6QZTmG3chm",
    detalleImagenes: [
      "/assests/complementos/h1.jpg",
      "/assests/complementos/h2.jpg",
      "/assests/complementos/h3.jpg"
    ],
    rating: 9.3,
    precio: 24.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "7",
    image: "https://i.pinimg.com/736x/d3/76/44/d37644900bca352bff7f70d79104c076.jpg",
    titulo: "Super Mario Odyssey",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/u6oPBIVjf8E?si=IYQnI8b473DZM92G",
    detalleImagenes: [
      "/assests/complementos/mb3.jpg",
      "/assests/complementos/mb1.jpg",
      "/assests/complementos/mb2.jpg"
    ],
    rating: 9.3,
    precio: 59.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Aventura" },
    plataformas: [
      { id: 1, nombre: "Nintendo" }
    ],
    ventas: []
  },
  {
    id: "8",
    image: "/assests/carrusel/Persona5.jpg",
    titulo: "Persona 5 Royal",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/SKpSpvFCZRw?si=YklirQu_9LJkF3UH",
    detalleImagenes: [
      "/assests/complementos/p1.jpg",
      "/assests/complementos/p2.jpg",
      "/assests/complementos/p3.jpg"
    ],
    rating: 9.2,
    precio: 49.99,

    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "RPG" },
    plataformas: [
      { id: 1, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "9",
    image: "/assests/carrusel/bloodborne.jpg",
    titulo: "Bloodborne",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/G203e1HhixY",
    detalleImagenes: [
      "/assests/complementos/b1.jpg",
      "/assests/complementos/b2.jpg",
      "/assests/complementos/b3.jpg"
    ],
    rating: 9.1,
    precio: 19.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Acción" },
    plataformas: [
      { id: 1, nombre: "PlayStation" }
    ],
    ventas: []
  },
  {
    id: "10",
    image: "https://s01.riotpixels.net/data/c8/97/c897801b-8a44-4318-8ab3-7633f0ae75a0.jpg/cover.cyberpunk-2077.1440x2160.2019-08-20.154.jpg",
    titulo: "Cyberpunk 2077 (2.0)",
    description: "Uno de los juegos mejor calificados por crítica y comunidad.",
    videoURL: "https://www.youtube.com/embed/FknHjl7eQ6o",
    detalleImagenes: [
      "/assests/complementos/c1.jpg",
      "/assests/complementos/c2.jpg",
      "/assests/complementos/c3.jpg"
    ],
    rating: 9.0,
    precio: 49.99,
    categoria_id: 1,
    esta_oferta: false,
    estado: true,
    categoria: { id: 1, nombre: "Mundo Abierto" },
    plataformas: [
      { id: 1, nombre: "PC" },
      { id: 2, nombre: "PlayStation" }
    ],
    ventas: []
  }
];
