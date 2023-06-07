/*
  Warnings:

  - You are about to drop the column `imageBackground` on the `ProductCategory` table. All the data in the column will be lost.
  - Added the required column `imageBackgroundLink` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageBackgroundName` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductCategory` DROP COLUMN `imageBackground`,
    ADD COLUMN `imageBackgroundLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageBackgroundName` VARCHAR(191) NOT NULL;
