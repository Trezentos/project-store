/*
  Warnings:

  - You are about to drop the column `active` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `ProductFilter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductFilter` DROP FOREIGN KEY `ProductFilter_productCategoryId_fkey`;

-- AlterTable
ALTER TABLE `ProductCategory` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `ProductFilter` DROP COLUMN `productCategoryId`;

-- CreateTable
CREATE TABLE `_ProductCategoryToProductFilter` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductCategoryToProductFilter_AB_unique`(`A`, `B`),
    INDEX `_ProductCategoryToProductFilter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToProductFilter` ADD CONSTRAINT `_ProductCategoryToProductFilter_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToProductFilter` ADD CONSTRAINT `_ProductCategoryToProductFilter_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductFilter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
