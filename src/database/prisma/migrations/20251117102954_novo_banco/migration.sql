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
    "quantidadeLivro" INTEGER NOT NULL,
    "motivoRetirada" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataRetorno" TIMESTAMP(3),
    "usuarioId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,

    CONSTRAINT "retirada_livro_pkey" PRIMARY KEY ("retirada_id")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."login" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livro_titulo_key" ON "public"."Livro"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nome_key" ON "public"."Usuario"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "login_email_key" ON "public"."login"("email");

-- AddForeignKey
ALTER TABLE "public"."retirada_livro" ADD CONSTRAINT "retirada_livro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."retirada_livro" ADD CONSTRAINT "retirada_livro_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "public"."Livro"("livro_id") ON DELETE RESTRICT ON UPDATE CASCADE;
