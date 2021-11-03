/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `BodyPart` (
    `name` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'FBW') NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `type` ENUM('STRETCH', 'EXERCISE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BodyPartToExercise` (
    `A` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'FBW') NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BodyPartToExercise_AB_unique`(`A`, `B`),
    INDEX `_BodyPartToExercise_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodyPartToExercise` ADD FOREIGN KEY (`A`) REFERENCES `BodyPart`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodyPartToExercise` ADD FOREIGN KEY (`B`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
