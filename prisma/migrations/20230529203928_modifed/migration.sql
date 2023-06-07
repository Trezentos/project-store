/*
  Warnings:

  - You are about to drop the column `productFilterId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `ProductFilter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `ProductFilter_productCategoryId_fkey` ON `ProductFilter`;

-- AlterTable
ALTER TABLE `ProductCategory` DROP COLUMN `productFilterId`;

-- AlterTable
ALTER TABLE `ProductFilter` DROP COLUMN `productCategoryId`;
