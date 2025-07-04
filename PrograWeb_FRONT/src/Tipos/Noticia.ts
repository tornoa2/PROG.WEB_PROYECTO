export interface Noticia {
  id: number;
  titulo: string;
  subtitulo?: string;
  cuerpo: string;
  fecha_publicacion?: string;
  etiquetas?: string[];
  activo: boolean;
}