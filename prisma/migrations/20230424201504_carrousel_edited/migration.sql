/*
  Warnings:

  - You are about to drop the column `imageSrc` on the `CarrousselImage` table. All the data in the column will be lost.
  - Added the required column `desktopSrc` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileSrc` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CarrousselImage` DROP COLUMN `imageSrc`,
    ADD COLUMN `desktopSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobileSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
