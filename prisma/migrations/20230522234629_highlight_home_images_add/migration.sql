-- CreateTable
CREATE TABLE `HighlightHomeImages` (
    `id` VARCHAR(191) NOT NULL,
    `image1Link` VARCHAR(191) NOT NULL,
    `image1Key` VARCHAR(191) NOT NULL,
    `image2Link` VARCHAR(191) NOT NULL,
    `image2Key` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
