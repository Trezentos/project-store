-- AlterTable
ALTER TABLE `Image` ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `orignialName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductVariation` MODIFY `price` BIGINT NOT NULL;
