/*
  Warnings:

  - You are about to drop the column `subItemLinkColum1` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subItemLinkColum2` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subItemLinkColum3` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subItemTitleColum1` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subItemTitleColum2` on the `HeaderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subItemTitleColum3` on the `HeaderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `HeaderItem` DROP COLUMN `subItemLinkColum1`,
    DROP COLUMN `subItemLinkColum2`,
    DROP COLUMN `subItemLinkColum3`,
    DROP COLUMN `subItemTitleColum1`,
    DROP COLUMN `subItemTitleColum2`,
    DROP COLUMN `subItemTitleColum3`;

-- AlterTable
ALTER TABLE `HeaderSubItem` ADD COLUMN `isHighlightedSubItem` BOOLEAN NOT NULL DEFAULT false;
