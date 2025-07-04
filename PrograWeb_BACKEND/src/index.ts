import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "./generated/prisma";
dotenv.config();
import noticiasRouter from "./noticias";

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use("/news", noticiasRouter);

app.get("/", (req: Request, resp: Response) => {
  resp.send("Endpoint raiz de Backend de Marketplace");
});

app.get("/games", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const games = await prisma.game.findMany({
      where: { estado: true }, // <<<< SOLO VISIBLES
      orderBy: {
        id: 'asc',
      },
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
        categoria_id: parseInt(categoriaId),
        releaseDate: new Date(releaseDate),
        image: null, // opcional, por ahora null
        videoURL: null, // opcional
        rating: null, // opcional
        descuento: descuento ? parseFloat(descuento) : 0,
        esta_oferta: descuento && descuento > 0 ? true : false,
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
  const { id } = req.params;
  const {
    titulo,
    description,
    precio,
    descuento,
    releaseDate,
    categoriaId,
    plataformasSeleccionadas,
  } = req.body;

  try {
    // Validación básica
    if (!titulo || !description || !precio || !releaseDate || !categoriaId) {
      res.status(400).json({ error: "Faltan campos obligatorios." });
      return;
    }

    // Actualizar el juego en la tabla Game
    const juegoActualizado = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        description,
        precio: parseFloat(precio),
        descuento: descuento ? parseFloat(descuento) : 0,
        esta_oferta: descuento && descuento > 0 ? true : false,
        releaseDate: new Date(releaseDate),
        categoria_id: parseInt(categoriaId),
      },
    });

    // Actualizar plataformas:
    if (Array.isArray(plataformasSeleccionadas)) {
      // Eliminar relaciones anteriores del juego con plataformas
      await prisma.platformOnGame.deleteMany({
        where: { gameId: parseInt(id) },
      });

      // Insertar las nuevas relaciones
      if (plataformasSeleccionadas.length > 0) {
        const datosPlataformas = plataformasSeleccionadas.map((platformId: number) => ({
          gameId: parseInt(id),
          platformId: platformId,
        }));

        await prisma.platformOnGame.createMany({
          data: datosPlataformas,
        });
      }
    }

    res.status(200).json({
      message: "Juego actualizado correctamente",
      juego: juegoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar juego:", error);
    res.status(500).json({ error: "Error al actualizar juego" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
