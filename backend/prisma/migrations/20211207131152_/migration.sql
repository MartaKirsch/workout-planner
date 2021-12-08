-- AlterTable
ALTER TABLE `BodyPartsOnExercise` MODIFY `bPartId` ENUM('ARMS', 'LEGS', 'ABS', 'BACK', 'MULTI_JOINT', 'CHEST'),
    MODIFY `exerciseId` VARCHAR(191);
