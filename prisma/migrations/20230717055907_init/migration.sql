/*
  Warnings:

  - You are about to alter the column `kode_pajak` on the `perusahaan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE `perusahaan` MODIFY `kode_pajak` VARCHAR(3) NOT NULL;
