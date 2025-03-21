/*
  Warnings:

  - You are about to drop the column `configuratorId` on the `Lead` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_configuratorId_fkey";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "configuratorId";
