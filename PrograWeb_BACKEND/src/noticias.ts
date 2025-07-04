import { Router, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma"; // Ajusta el import según tu estructura

const prisma = new PrismaClient();
const router = Router();

// GET /news
router.get("/", async (req: Request, res: Response) => {
  try {
    const noticias = await prisma.news.findMany({
      orderBy: { fecha_publicacion: "desc" },
    });
    res.json(noticias);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    res.status(500).json({ error: "Error al obtener noticias" });
  }
});

// POST /news
router.post("/", async (req: Request, res: Response) => {
  const { titulo, subtitulo, cuerpo, imagenPrincipal, fecha_publicacion, etiquetas, activo } = req.body;
  try {
    const nuevaNoticia = await prisma.news.create({
      data: {
        titulo,
        subtitulo,
        cuerpo,
        imagenPrincipal,
        fecha_publicacion: fecha_publicacion ? new Date(fecha_publicacion) : new Date(),
        etiquetas: etiquetas ?? [],
        activo: activo ?? true,
      },
    });
    res.status(201).json({ message: "Noticia creada correctamente", noticia: nuevaNoticia });
  } catch (error) {
    console.error("Error al crear noticia:", error);
    res.status(500).json({ error: "Error al crear noticia" });
  }
});

// PUT /news/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, subtitulo, cuerpo, imagenPrincipal, fecha_publicacion, etiquetas, activo } = req.body;
  try {
    const noticiaActualizada = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        subtitulo,
        cuerpo,
        imagenPrincipal,
        fecha_publicacion: fecha_publicacion ? new Date(fecha_publicacion) : undefined,
        etiquetas: etiquetas ?? [],
        activo: activo ?? true,
      },
    });
    res.json({ message: "Noticia actualizada correctamente", noticia: noticiaActualizada });
  } catch (error) {
    console.error("Error al actualizar noticia:", error);
    res.status(500).json({ error: "Error al actualizar noticia" });
  }
});

// DELETE /news/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.news.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Noticia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    res.status(500).json({ error: "Error al eliminar noticia" });
  }
});

export default router;