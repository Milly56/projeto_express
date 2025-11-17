/*
  Warnings:

  - You are about to drop the column `dataRetirada` on the `retirada_livro` table. All the data in the column will be lost.
  - You are about to drop the column `dataRetorno` on the `retirada_livro` table. All the data in the column will be lost.
  - You are about to drop the column `livroId` on the `retirada_livro` table. All the data in the column will be lost.
  - You are about to drop the column `motivoRetirada` on the `retirada_livro` table. All the data in the column will be lost.
  - You are about to drop the column `quantidadeLivro` on the `retirada_livro` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `retirada_livro` table. All the data in the column will be lost.
  - Added the required column `livro_id` to the `retirada_livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivo_retirada` to the `retirada_livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade_livro` to the `retirada_livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `retirada_livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."retirada_livro" DROP CONSTRAINT "retirada_livro_livroId_fkey";

-- DropForeignKey
ALTER TABLE "public"."retirada_livro" DROP CONSTRAINT "retirada_livro_usuarioId_fkey";

-- AlterTable
ALTER TABLE "public"."retirada_livro" DROP COLUMN "dataRetirada",
DROP COLUMN "dataRetorno",
DROP COLUMN "livroId",
DROP COLUMN "motivoRetirada",
DROP COLUMN "quantidadeLivro",
DROP COLUMN "usuarioId",
ADD COLUMN     "data_retirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_retorno" TIMESTAMP(3),
ADD COLUMN     "livro_id" INTEGER NOT NULL,
ADD COLUMN     "motivo_retirada" TEXT NOT NULL,
ADD COLUMN     "quantidade_livro" INTEGER NOT NULL,
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."retirada_livro" ADD CONSTRAINT "retirada_livro_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."retirada_livro" ADD CONSTRAINT "retirada_livro_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "public"."Livro"("livro_id") ON DELETE RESTRICT ON UPDATE CASCADE;
