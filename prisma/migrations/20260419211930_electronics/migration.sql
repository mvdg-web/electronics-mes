-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "revision" TEXT NOT NULL DEFAULT 'A';

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "failedQty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passedQty" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "currentStep" TEXT NOT NULL DEFAULT 'SMT',
    "isDefective" BOOLEAN NOT NULL DEFAULT false,
    "workOrderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitHistory" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "note" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_serialNumber_key" ON "Unit"("serialNumber");

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitHistory" ADD CONSTRAINT "UnitHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
