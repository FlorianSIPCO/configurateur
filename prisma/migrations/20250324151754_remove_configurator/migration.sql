/*
  Warnings:

  - You are about to drop the column `configuratorId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Configurator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_configuratorId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "configuratorId";

-- DropTable
DROP TABLE "Configurator";
