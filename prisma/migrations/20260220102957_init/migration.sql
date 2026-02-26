-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);
