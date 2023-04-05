/*
  Warnings:

  - You are about to drop the column `AvailableSizes` on the `ProductColor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProductColor` DROP COLUMN `AvailableSizes`,
    ADD COLUMN `availableSizes` VARCHAR(191) NULL;
