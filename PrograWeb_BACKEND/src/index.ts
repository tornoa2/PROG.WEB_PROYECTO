import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
// import { listaCanciones, Cancion } from "./data";
import { Prisma, PrismaClient } from "./generated/prisma";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.get("/", (req: Request, resp: Response) => {
  resp.send("Endpoint raiz de Backend de Marketplace");
});

app.get("/juegos", async (req: Request, resp: Response) => {
  const prisma = new PrismaClient()
  const estado = req.query.estado

  if (estado === undefined) {
    const listaJuegos = await prisma.juego.findMany()
    resp.json(listaJuegos);
    return;
  }

  const listaJuegos = await prisma.juego.findMany({
    where: {
      estado: estado == "0" ? false : true
    }
  });

  resp.json(listaJuegos);
});

app.post("/juegos", async (req: Request, resp: Response) => {
    const prisma = new PrismaClient();
    const juego = req.body;

    // Validar que se envíe data
    if (juego == undefined) {
        resp.status(400).json({
            msg: "Debe enviar data del JUEGO."
        });
        return;
    }

    // Validar que se envíe 'nombre'
    if (juego.nombre == undefined) {
        resp.status(400).json({
            msg: "Debe enviar un nombre del JUEGO."
        });
        return;
    }

    // Validar que se envíe 'precio'
    if (juego.precio == undefined) {
        resp.status(400).json({
            msg: "Debe enviar un precio del JUEGO."
        });
        return;
    }

    // Validar que se envíe 'categoriaId'
    if (juego.categoriaId == undefined) {
        resp.status(400).json({
            msg: "Debe enviar un categoriaId del JUEGO."
        });
        return;
    }

    try {
        const juegoCreado = await prisma.juego.create({
            data: {
                nombre: juego.nombre,
                precio: juego.precio,
                categoriaId: juego.categoriaId,
                esta_oferta: juego.esta_oferta ?? false,
                estado: juego.estado ?? true,
            },
        });

        resp.json({
            msg: "Juego creado correctamente.",
            juego: juegoCreado
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({
            msg: "Error al crear el juego."
        });
    }
});

app.get("/noticias", async (req: Request, resp: Response) => {
  const prisma = new PrismaClient()
  const estado = req.query.estado

  if (estado === undefined) {
    const listaNoticias = await prisma.noticia.findMany()
    resp.json(listaNoticias);
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
