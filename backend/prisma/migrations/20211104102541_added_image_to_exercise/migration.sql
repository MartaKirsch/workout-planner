/*
  Warnings:

  - Added the required column `image` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN `image` VARCHAR(191) NOT NULL;
