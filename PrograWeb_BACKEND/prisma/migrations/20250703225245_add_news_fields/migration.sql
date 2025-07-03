/*
  Warnings:

  - You are about to drop the column `texto` on the `News` table. All the data in the column will be lost.
  - Added the required column `cuerpo` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "texto",
ADD COLUMN     "cuerpo" TEXT NOT NULL,
ADD COLUMN     "etiquetas" TEXT[],
ADD COLUMN     "fecha_publicacion" TIMESTAMP(3),
ADD COLUMN     "imagenPrincipal" TEXT,
ADD COLUMN     "subtitulo" TEXT;
