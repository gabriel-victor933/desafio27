/*
  Warnings:

  - You are about to drop the column `awayTeamName` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamName` on the `Bet` table. All the data in the column will be lost.
  - The `amountWon` column on the `Bet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `awayTeamScore` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamScore` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "awayTeamName",
DROP COLUMN "homeTeamName",
ADD COLUMN     "awayTeamScore" INTEGER NOT NULL,
ADD COLUMN     "homeTeamScore" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
DROP COLUMN "amountWon",
ADD COLUMN     "amountWon" INTEGER;
