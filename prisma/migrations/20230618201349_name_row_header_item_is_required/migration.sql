/*
  Warnings:

  - Made the column `name` on table `HeaderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `HeaderItem` MODIFY `name` VARCHAR(191) NOT NULL;
