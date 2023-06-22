/*
  Warnings:

  - You are about to drop the column `headerItem_id` on the `HeaderSubItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HeaderSubItem` DROP FOREIGN KEY `HeaderSubItem_headerItem_id_fkey`;

-- AlterTable
ALTER TABLE `HeaderSubItem` DROP COLUMN `headerItem_id`;

-- CreateTable
CREATE TABLE `_HeaderItemToHeaderSubItem` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_HeaderItemToHeaderSubItem_AB_unique`(`A`, `B`),
    INDEX `_HeaderItemToHeaderSubItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HeaderItemToHeaderSubItem` ADD CONSTRAINT `_HeaderItemToHeaderSubItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `HeaderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HeaderItemToHeaderSubItem` ADD CONSTRAINT `_HeaderItemToHeaderSubItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `HeaderSubItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
