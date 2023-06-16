/*
  Warnings:

  - Added the required column `hifen` to the `ProductFilter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductFilter` ADD COLUMN `hifen` VARCHAR(191) NOT NULL;
