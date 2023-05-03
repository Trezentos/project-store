/*
  Warnings:

  - You are about to drop the column `desktopSrc` on the `CarrousselImage` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `CarrousselImage` table. All the data in the column will be lost.
  - You are about to drop the column `mobileSrc` on the `CarrousselImage` table. All the data in the column will be lost.
  - Added the required column `desktopKey` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desktopLink` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileKey` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileLink` to the `CarrousselImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CarrousselImage` DROP COLUMN `desktopSrc`,
    DROP COLUMN `key`,
    DROP COLUMN `mobileSrc`,
    ADD COLUMN `desktopKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `desktopLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobileKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobileLink` VARCHAR(191) NOT NULL;
