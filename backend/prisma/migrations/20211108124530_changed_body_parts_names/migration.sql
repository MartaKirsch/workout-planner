/*
  Warnings:

  - The primary key for the `BodyPart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [FBW] on the enum `BodyPart_name` will be removed. If these variants are still used in the database, this will fail.
  - The values [FBW] on the enum `BodyPart_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_BodyPartToExercise` DROP FOREIGN KEY `_BodyPartToExercise_ibfk_1`;

-- AlterTable
ALTER TABLE `BodyPart` DROP PRIMARY KEY,
    MODIFY `name` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'MULTI_JOINT', 'CHEST') NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `_BodyPartToExercise` MODIFY `A` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'MULTI_JOINT', 'CHEST') NOT NULL;

-- AddForeignKey
ALTER TABLE `_BodyPartToExercise` ADD FOREIGN KEY (`A`) REFERENCES `BodyPart`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
