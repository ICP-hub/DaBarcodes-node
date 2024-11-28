-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Deactivated');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPromotion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "promotedBy" TEXT[],
ADD COLUMN     "promotionValidUntil" TIMESTAMP(3),
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Active';
