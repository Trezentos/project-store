/*
  Warnings:

  - You are about to drop the column `imageKey` on the `MainBackgroundHome` table. All the data in the column will be lost.
  - You are about to drop the column `imageLink` on the `MainBackgroundHome` table. All the data in the column will be lost.
  - Added the required column `desktopKey` to the `MainBackgroundHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desktopLink` to the `MainBackgroundHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileKey` to the `MainBackgroundHome` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileLink` to the `MainBackgroundHome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MainBackgroundHome` DROP COLUMN `imageKey`,
    DROP COLUMN `imageLink`,
    ADD COLUMN `desktopKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `desktopLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobileKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobileLink` VARCHAR(191) NOT NULL;
