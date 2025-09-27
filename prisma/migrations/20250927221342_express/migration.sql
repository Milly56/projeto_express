-- CreateTable
CREATE TABLE "public"."Livro" (
    "livro_id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("livro_id")
);

-- CreateTable
CREATE TABLE "public"."retirada_livro" (
    "retirada_id" SERIAL NOT NULL,
    "pessoa" TEXT NOT NULL,
    "livro" TEXT NOT NULL,
    "quantidadeLivro" INTEGER NOT NULL,
    "motivoRetirada" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataRetorno" TIMESTAMP(3),

    CONSTRAINT "retirada_livro_pkey" PRIMARY KEY ("retirada_id")
);
