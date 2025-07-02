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

app.get("/games", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const games = await prisma.game.findMany({
      where: { estado: true }, // <<<< SOLO VISIBLES
      include: {
        categoria: true,
        plataformas: {
          include: { platform: true }
        }
      }
    });
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los juegos" });
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/categorias", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const categorias = await prisma.category.findMany();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/plataformas", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const plataformas = await prisma.platform.findMany();
    res.json(plataformas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las plataformas" });
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/games", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const {
      titulo,
      description,
      precio,
      categoriaId,
      releaseDate,
      plataformasSeleccionadas,
      descuento
    } = req.body;

    // Validaciones básicas
    if (!titulo || !description || !precio || !categoriaId || !releaseDate) {
      res.status(400).json({ error: "Faltan campos obligatorios." });
      return;
    }

    // Crear el juego
    const nuevoJuego = await prisma.game.create({
      data: {
        titulo,
        description,
        precio: parseFloat(precio),
        categoria: { connect: { id: parseInt(categoriaId) } },
        releaseDate: new Date(releaseDate),
        image: null, // opcional, por ahora null
        videoURL: null, // opcional
        rating: null, // opcional
        descuento: descuento ? parseFloat(descuento) : 0,
      },
    });

    // Insertar plataformas seleccionadas en la tabla intermedia
    if (Array.isArray(plataformasSeleccionadas)) {
      for (const plataformaId of plataformasSeleccionadas) {
        await prisma.platformOnGame.create({
          data: {
            gameId: nuevoJuego.id,
            platformId: parseInt(plataformaId),
          },
        });
      }
    }

    res.status(201).json({ message: "Juego creado exitosamente", juego: nuevoJuego });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el juego" });
  } finally {
    await prisma.$disconnect();
  }
});

app.patch("/games/:id/ocultar", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const { id } = req.params;

  try {
    const juego = await prisma.game.update({
      where: { id: parseInt(id) },
      data: { estado: false },
    });

    res.json({ message: "Juego ocultado correctamente", juego });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ocultar el juego" });
  } finally {
    await prisma.$disconnect();
  }
});

app.put("/games/:id", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const { id } = req.params;
  const { titulo, description, precio, descuento, releaseDate } = req.body;

  try {
    const juegoActualizado = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        description,
        precio: parseFloat(precio),
        descuento: parseFloat(descuento),
        releaseDate: new Date(releaseDate),
      },
    });
    res.json({ message: "Juego actualizado", juego: juegoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar juego" });
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
