/*
  Warnings:

  - The primary key for the `barang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Perusahaan` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `kode_barang` on the `barang` table. All the data in the column will be lost.
  - The primary key for the `perusahaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode_pajak` on the `perusahaan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kode]` on the table `Barang` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Barang` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `kode` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perusahaan_id` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Perusahaan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `kode` to the `Perusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` DROP PRIMARY KEY,
    DROP COLUMN `Perusahaan`,
    DROP COLUMN `kode_barang`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `kode` VARCHAR(191) NOT NULL,
    ADD COLUMN `perusahaan_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `perusahaan` DROP PRIMARY KEY,
    DROP COLUMN `kode_pajak`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `kode` VARCHAR(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Barang_kode_key` ON `Barang`(`kode`);
