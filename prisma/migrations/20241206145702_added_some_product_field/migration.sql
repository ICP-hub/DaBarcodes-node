/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotionValidUntil` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stockAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skuId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skuId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Supplier', 'Retailer');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "price",
DROP COLUMN "promotionValidUntil",
DROP COLUMN "stockAvailable",
DROP COLUMN "storeId",
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productType" "ProductType" NOT NULL DEFAULT 'Supplier',
ADD COLUMN     "promotionDescription" TEXT,
ADD COLUMN     "promotionEndDate" TIMESTAMP(3),
ADD COLUMN     "promotionStartDate" TIMESTAMP(3),
ADD COLUMN     "skuId" TEXT NOT NULL,
ADD COLUMN     "subCategory" TEXT,
ADD COLUMN     "umbrellaBrandName" TEXT,
ALTER COLUMN "supplierName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_skuId_key" ON "Product"("skuId");
