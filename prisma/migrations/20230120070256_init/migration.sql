-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "mnemonic" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_label_key" ON "Wallet"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_mnemonic_key" ON "Wallet"("mnemonic");
