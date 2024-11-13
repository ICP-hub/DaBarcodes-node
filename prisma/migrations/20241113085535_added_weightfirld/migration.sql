-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "subBrandName" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "weight" TEXT NOT NULL,
    "promotionPrice" DOUBLE PRECISION,
    "supplierName" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "description" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT true,
    "stockAvailable" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
