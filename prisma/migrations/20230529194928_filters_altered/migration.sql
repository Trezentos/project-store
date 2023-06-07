/*
  Warnings:

  - You are about to drop the column `filters` on the `ProductCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProductCategory` DROP COLUMN `filters`;

-- CreateTable
CREATE TABLE `ProductFilter` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `productCategoryId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductFilter` ADD CONSTRAINT `ProductFilter_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
