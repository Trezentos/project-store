/*
  Warnings:

  - You are about to drop the column `name` on the `CarrousselImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CarrousselImage` DROP COLUMN `name`,
    ADD COLUMN `key` VARCHAR(191) NULL;
