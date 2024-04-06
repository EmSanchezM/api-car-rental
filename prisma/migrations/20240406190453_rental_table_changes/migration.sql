/*
  Warnings:

  - You are about to drop the column `LodgingDate` on the `Rental` table. All the data in the column will be lost.
  - Added the required column `lodgingDate` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rental` DROP COLUMN `LodgingDate`,
    ADD COLUMN `lodgingDate` DATETIME(3) NOT NULL;
