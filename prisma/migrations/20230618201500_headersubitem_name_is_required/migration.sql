/*
  Warnings:

  - Made the column `name` on table `HeaderSubItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `HeaderSubItem` MODIFY `name` VARCHAR(191) NOT NULL;
