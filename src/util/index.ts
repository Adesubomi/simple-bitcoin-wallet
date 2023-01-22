import chalk from "chalk";
import {
    storeSeedPhrase,
    getWallets, findWallet
} from "../data/wallet";

const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory } = require('bip32')
const {createHash} = require("crypto");
const Table = require('cli-table');
const ecc = require('tiny-secp256k1');
const bip39 = require("bip39");
const bip32 = BIP32Factory(ecc);


import { BIP32Interface } from "bip32";
import { payments, Psbt } from "bitcoinjs-lib";

import { Address, DecoratedUtxo } from "../types";

const generateMnemonic = (): string => {
    let mnemonic = bip39.generateMnemonic();
    return mnemonic.toString();
}

export const walletCreate = async (args: any[]): Promise<void> => {
    console.log("Creating wallet...");

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
            console.log(wallets);
            const table = new Table({
                head: ['#', 'Labels ', 'Addresses'],
                colWidths: [12, 12, 12]
            });

            const parsedWallets = wallets.map( walletX => {
                return {
                    hash: walletX.hash,
                    label: walletX.label.toString().substring(0, 7) +"...",
                    addressCount: 0,
                };
            });

            parsedWallets.forEach( parsedWallet => {
                table.push([
                    parsedWallet.hash,
                    parsedWallet.label,
                    parsedWallet.addressCount,
                ]);
            });

            console.log(table.toString());
        } else {
            console.log(chalk.yellow("    [~] No wallets found. Create a new wallet with the `create` command"));
        }
    });
}

export const generateAddress = async (args: any): Promise<void> => {
    const walletLabel = args.wallet.toString();

    await findWallet(walletLabel).then( wallet => {
        const network = bitcoin.networks.regtest;
        const mnemonic = wallet.mnemonic;
        const path = `m/49'/0'/0'`;
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed, );

        const account = root.derivePath(path);
        const node = account.derive(0).derive(0);

        const btcAddress = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network,
        }).address

        const segwitAddress = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({
                pubkey: node.publicKey,
                network: network,
            }),
            network: network,
        }).address;


        console.log(`Bitcoin address: ${btcAddress}`);
        console.log(`SegWit address: ${segwitAddress}`);

        // TODO [DANIEL]:: store the wallet...
    });

}

export const getAddresses = async (args: any[]): Promise<void> => {
    throw new Error("Function not implemented yet");
}

export const verifyAddress = async (args: any[]): Promise<void> => {
    throw new Error("Function not implemented yet");
}

export const newTransaction = async (args: any[]): Promise<void> => {
    throw new Error("Function not implemented yet");
}
