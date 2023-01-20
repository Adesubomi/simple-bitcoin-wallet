const bip39 = require("bip39");
import chalk from "chalk";
import {storeSeedPhrase,
    getWallets } from "../data/wallet";
const { createHash } = require('crypto');
const Table = require('cli-table');


const generateMnemonic = (): string => {
    let mnemonic = bip39.generateMnemonic();
    return mnemonic.toString();
}

export const walletCreate = async (args: any[]): Promise<void> => {
    console.log("Ready to create wallets");
//    console.log("    args - - ", args);

    const mnemonicString = generateMnemonic();
    const label = createHash('sha256').update(mnemonicString).digest('hex');

    console.log(chalk.white("    Here is your wallet seed phrase"));
    console.log(chalk.yellow("        NOTE: You won't be able to see this seed phrase again after now."));
    console.log(chalk.yellow("        NOTE: Please keeep it safe. There is no way to recover your funds if you lose it."));
    console.log("");
    console.log(chalk.white("    Label: "+ label));
    console.log(chalk.white("    Seed Phrase: "+ mnemonicString));

    storeSeedPhrase(mnemonicString, label).then(w => {
        console.log(chalk.green(""));
        console.log(chalk.green("        [✔] Wallet created"));
    });
}

export const getAllWallets = async () => {
    await getWallets().then( wallets => {
        if (wallets && wallets.length > 0) {
            const table = new Table({
                head: ['ID', 'Labels ', 'Addresses'],
                colWidths: [4, 12, 12]
            });

            const parsedWallets = wallets.map( walletX => {
                return {
                    id: walletX.id,
                    label: walletX.label.toString().substring(0, 7) +"...",
                    addressCount: 0,
                };
            });

            parsedWallets.forEach( parsedWallet => {
                table.push([parsedWallet.id, parsedWallet.label]);
            });

            console.log(table.toString());
        } else {
            console.log(chalk.yellow("    [~] No wallets found. Create a new wallet with the `create` command"));
        }
    });
}

export const generateAddress = async (args: any[]): Promise<void> => {
    console.log(args);
    console.log(typeof args);
}

export const newTransaction = async (args: any[]): Promise<void> => {
    await getWallets().then( wallets => {

    });

    console.log("This command should construct a transaction");
    console.log("    args - - ", args);
}