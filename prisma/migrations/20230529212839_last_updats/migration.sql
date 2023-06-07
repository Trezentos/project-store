/*
  Warnings:

  - Made the column `productCategoryId` on table `ProductFilter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ProductFilter` DROP FOREIGN KEY `ProductFilter_productCategoryId_fkey`;

-- AlterTable
ALTER TABLE `ProductFilter` MODIFY `productCategoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductFilter` ADD CONSTRAINT `ProductFilter_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
