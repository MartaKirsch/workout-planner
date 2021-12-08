/*
  Warnings:

  - You are about to drop the `_BodyPartToExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_BodyPartToExercise` DROP FOREIGN KEY `_BodyPartToExercise_ibfk_3`;

-- DropForeignKey
ALTER TABLE `_BodyPartToExercise` DROP FOREIGN KEY `_BodyPartToExercise_ibfk_2`;

-- DropTable
DROP TABLE `_BodyPartToExercise`;

-- CreateTable
CREATE TABLE `BodyPartsOnExercise` (
    `BId` VARCHAR(191) NOT NULL,
    `AId` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'MULTI_JOINT', 'CHEST') NOT NULL,

    PRIMARY KEY (`BId`, `AId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BodyPartsOnExercise` ADD CONSTRAINT `BodyPartsOnExercise_BId_fkey` FOREIGN KEY (`BId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BodyPartsOnExercise` ADD CONSTRAINT `BodyPartsOnExercise_AId_fkey` FOREIGN KEY (`AId`) REFERENCES `BodyPart`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
