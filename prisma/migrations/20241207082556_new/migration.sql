/*
  Warnings:

  - A unique constraint covering the columns `[principleId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `principleId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_skuId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "principleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_principleId_key" ON "Product"("principleId");
