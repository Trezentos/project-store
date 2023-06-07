/*
  Warnings:

  - You are about to drop the `_ProductCategoryToFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProductCategoryToFilter` DROP FOREIGN KEY `_ProductCategoryToFilter_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductCategoryToFilter` DROP FOREIGN KEY `_ProductCategoryToFilter_B_fkey`;

-- AlterTable
ALTER TABLE `ProductFilter` ADD COLUMN `productCategoryId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_ProductCategoryToFilter`;

-- AddForeignKey
ALTER TABLE `ProductFilter` ADD CONSTRAINT `ProductFilter_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
