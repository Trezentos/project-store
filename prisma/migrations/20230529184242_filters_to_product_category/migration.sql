/*
  Warnings:

  - Added the required column `filters` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `filters` VARCHAR(191) NOT NULL;
