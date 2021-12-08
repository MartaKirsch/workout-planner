/*
  Warnings:

  - The primary key for the `BodyPartsOnExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AId` on the `BodyPartsOnExercise` table. All the data in the column will be lost.
  - You are about to drop the column `BId` on the `BodyPartsOnExercise` table. All the data in the column will be lost.
  - Added the required column `bPartId` to the `BodyPartsOnExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `BodyPartsOnExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BodyPartsOnExercise` DROP FOREIGN KEY `BodyPartsOnExercise_AId_fkey`;

-- DropForeignKey
ALTER TABLE `BodyPartsOnExercise` DROP FOREIGN KEY `BodyPartsOnExercise_BId_fkey`;

-- AlterTable
ALTER TABLE `BodyPartsOnExercise` DROP PRIMARY KEY,
    DROP COLUMN `AId`,
    DROP COLUMN `BId`,
    ADD COLUMN `bPartId` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'MULTI_JOINT', 'CHEST') NOT NULL,
    ADD COLUMN `exerciseId` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `BodyPartsOnExercise` ADD CONSTRAINT `BodyPartsOnExercise_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BodyPartsOnExercise` ADD CONSTRAINT `BodyPartsOnExercise_bPartId_fkey` FOREIGN KEY (`bPartId`) REFERENCES `BodyPart`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
