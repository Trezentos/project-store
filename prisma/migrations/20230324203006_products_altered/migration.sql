/*
  Warnings:

  - You are about to drop the column `product_id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageSrc` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `product_color_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_product_id_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `product_id`,
    ADD COLUMN `product_color_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `color`,
    DROP COLUMN `imageSrc`,
    DROP COLUMN `price`;

-- CreateTable
CREATE TABLE `ProductColor` (
    `id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `colorName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_product_color_id_fkey` FOREIGN KEY (`product_color_id`) REFERENCES `ProductColor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
