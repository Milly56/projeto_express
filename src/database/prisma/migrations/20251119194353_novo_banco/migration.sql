/*
  Warnings:

  - You are about to drop the `retirada_livro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."retirada_livro" DROP CONSTRAINT "retirada_livro_livro_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."retirada_livro" DROP CONSTRAINT "retirada_livro_usuario_id_fkey";

-- DropTable
DROP TABLE "public"."retirada_livro";

-- CreateTable
CREATE TABLE "public"."RetiradaLivro" (
    "retirada_id" SERIAL NOT NULL,
    "quantidade_livro" INTEGER NOT NULL,
    "motivo_retirada" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "data_retirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_retorno" TIMESTAMP(3),
    "usuarioNome" TEXT NOT NULL,
    "livroTitulo" TEXT NOT NULL,

    CONSTRAINT "RetiradaLivro_pkey" PRIMARY KEY ("retirada_id")
);

-- AddForeignKey
ALTER TABLE "public"."RetiradaLivro" ADD CONSTRAINT "RetiradaLivro_usuarioNome_fkey" FOREIGN KEY ("usuarioNome") REFERENCES "public"."Usuario"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RetiradaLivro" ADD CONSTRAINT "RetiradaLivro_livroTitulo_fkey" FOREIGN KEY ("livroTitulo") REFERENCES "public"."Livro"("titulo") ON DELETE RESTRICT ON UPDATE CASCADE;
