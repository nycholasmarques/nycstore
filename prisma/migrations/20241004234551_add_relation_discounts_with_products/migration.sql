/*
  Warnings:

  - You are about to alter the column `value` on the `discounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
