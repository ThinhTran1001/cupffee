/*
  Warnings:

  - A unique constraint covering the columns `[qrMessageId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "qrMessageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_qrMessageId_key" ON "OrderItem"("qrMessageId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_qrMessageId_fkey" FOREIGN KEY ("qrMessageId") REFERENCES "QrMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
