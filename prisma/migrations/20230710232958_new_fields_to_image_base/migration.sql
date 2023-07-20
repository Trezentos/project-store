/*
  Warnings:

  - You are about to drop the column `orignialName` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `orignialName`,
    ADD COLUMN `originalName` VARCHAR(191) NULL;
