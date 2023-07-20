-- AlterTable
ALTER TABLE `HighlightHomeImages` ADD COLUMN `image1Name` VARCHAR(191) NULL,
    ADD COLUMN `image2Name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MainBackgroundHome` ADD COLUMN `desktopImageName` VARCHAR(191) NULL,
    ADD COLUMN `mobileImageName` VARCHAR(191) NULL;
