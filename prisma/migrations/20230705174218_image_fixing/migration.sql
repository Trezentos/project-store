/*
  Warnings:

  - You are about to drop the column `product_color_id` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_product_color_id_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `product_color_id`;
