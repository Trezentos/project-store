/*
  Warnings:

  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `size`;

-- AlterTable
ALTER TABLE `ProductColor` ADD COLUMN `AvailableSizes` VARCHAR(191) NULL;
