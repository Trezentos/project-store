-- DropForeignKey
ALTER TABLE `ProductFilter` DROP FOREIGN KEY `ProductFilter_productCategoryId_fkey`;

-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `productFilterId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_ProductCategoryToFilter` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductCategoryToFilter_AB_unique`(`A`, `B`),
    INDEX `_ProductCategoryToFilter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToFilter` ADD CONSTRAINT `_ProductCategoryToFilter_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToFilter` ADD CONSTRAINT `_ProductCategoryToFilter_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductFilter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
