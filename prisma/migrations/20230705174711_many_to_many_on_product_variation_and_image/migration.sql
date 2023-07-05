/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `ProductVariation` ADD COLUMN `description` TEXT NULL;

-- CreateTable
CREATE TABLE `_ImageToProductVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImageToProductVariation_AB_unique`(`A`, `B`),
    INDEX `_ImageToProductVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ImageToProductVariation` ADD CONSTRAINT `_ImageToProductVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToProductVariation` ADD CONSTRAINT `_ImageToProductVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
