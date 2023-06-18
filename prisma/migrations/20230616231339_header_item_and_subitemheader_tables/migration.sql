-- CreateTable
CREATE TABLE `HeaderItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderSubItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `headerItem_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HeaderItem` ADD CONSTRAINT `HeaderItem_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderSubItem` ADD CONSTRAINT `HeaderSubItem_headerItem_id_fkey` FOREIGN KEY (`headerItem_id`) REFERENCES `HeaderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderSubItem` ADD CONSTRAINT `HeaderSubItem_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
