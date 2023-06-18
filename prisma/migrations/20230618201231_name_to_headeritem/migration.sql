/*
  Warnings:

  - You are about to drop the column `itemName` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `HeaderSubItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `HeaderItem` DROP COLUMN `itemName`,
    ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HeaderSubItem` DROP COLUMN `itemName`,
    ADD COLUMN `name` VARCHAR(191) NULL;
