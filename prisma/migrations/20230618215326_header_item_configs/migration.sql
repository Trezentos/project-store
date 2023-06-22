/*
  Warnings:

  - Added the required column `columnPosition` to the `HeaderSubItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HeaderItem` ADD COLUMN `backgroundImageLinkTo` VARCHAR(191) NULL,
    ADD COLUMN `subItemLinkColum1` VARCHAR(191) NULL,
    ADD COLUMN `subItemLinkColum2` VARCHAR(191) NULL,
    ADD COLUMN `subItemLinkColum3` VARCHAR(191) NULL,
    ADD COLUMN `subItemTitleColum1` VARCHAR(191) NULL,
    ADD COLUMN `subItemTitleColum2` VARCHAR(191) NULL,
    ADD COLUMN `subItemTitleColum3` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HeaderSubItem` ADD COLUMN `columnPosition` INTEGER NOT NULL;
