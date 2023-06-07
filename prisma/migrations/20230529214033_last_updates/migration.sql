-- DropForeignKey
ALTER TABLE `ProductFilter` DROP FOREIGN KEY `ProductFilter_productCategoryId_fkey`;

-- AlterTable
ALTER TABLE `ProductFilter` MODIFY `productCategoryId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ProductFilter` ADD CONSTRAINT `ProductFilter_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
