/*
  Warnings:

  - Added the required column `hash` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    CONSTRAINT "Address_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "mnemonic" TEXT NOT NULL
);
INSERT INTO "new_Wallet" ("id", "label", "mnemonic") SELECT "id", "label", "mnemonic" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE UNIQUE INDEX "Wallet_label_key" ON "Wallet"("label");
CREATE UNIQUE INDEX "Wallet_hash_key" ON "Wallet"("hash");
CREATE UNIQUE INDEX "Wallet_mnemonic_key" ON "Wallet"("mnemonic");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_key" ON "Address"("address");
