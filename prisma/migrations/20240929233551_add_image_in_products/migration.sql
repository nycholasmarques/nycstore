/*
  Warnings:

  - Added the required column `image_url` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "image_url" TEXT NOT NULL,
ALTER COLUMN "discount_id" DROP NOT NULL;
