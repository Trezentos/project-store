-- CreateTable
CREATE TABLE `_ProductCategoryToProductVariation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductCategoryToProductVariation_AB_unique`(`A`, `B`),
    INDEX `_ProductCategoryToProductVariation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToProductVariation` ADD CONSTRAINT `_ProductCategoryToProductVariation_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCategoryToProductVariation` ADD CONSTRAINT `_ProductCategoryToProductVariation_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
