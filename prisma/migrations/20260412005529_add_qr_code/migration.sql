-- CreateTable
CREATE TABLE "QrMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fontSize" INTEGER NOT NULL DEFAULT 16,
    "color" TEXT NOT NULL DEFAULT '#4a2c20',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QrMessage_pkey" PRIMARY KEY ("id")
);
