/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brandName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotedBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotionDescription` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotionEndDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotionPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promotionStartDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subBrandName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `umbrellaBrandName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - The `productType` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[productId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `productId` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subCategory` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_principleId_key";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "brandName",
DROP COLUMN "id",
DROP COLUMN "promotedBy",
DROP COLUMN "promotionDescription",
DROP COLUMN "promotionEndDate",
DROP COLUMN "promotionPrice",
DROP COLUMN "promotionStartDate",
DROP COLUMN "status",
DROP COLUMN "subBrandName",
DROP COLUMN "supplierName",
DROP COLUMN "umbrellaBrandName",
DROP COLUMN "weight",
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "productDescription" TEXT,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "subBrandID" TEXT,
ALTER COLUMN "image" SET NOT NULL,
DROP COLUMN "productType",
ADD COLUMN     "productType" TEXT,
ALTER COLUMN "subCategory" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");

-- DropEnum
DROP TYPE "ProductType";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Promotion" (
    "promotionId" TEXT NOT NULL,
    "promotionSKUID" TEXT NOT NULL,
    "promotionPrice" TEXT NOT NULL,
    "promotionDescription" TEXT NOT NULL,
    "promotionStartDate" TIMESTAMP(3) NOT NULL,
    "promotionEndDate" TIMESTAMP(3) NOT NULL,
    "promotedBy" TEXT[],
    "targetRetailer" TEXT[],
    "promotionType" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("promotionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_promotionId_key" ON "Promotion"("promotionId");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_promotionSKUID_key" ON "Promotion"("promotionSKUID");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
