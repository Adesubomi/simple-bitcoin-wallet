import chalk from "chalk";
import {
    storeSeedPhrase,
    getWallets, findWallet, getWalletLatestIndex, storeAddress
} from "../data/wallet";

const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory, } = require('bip32')
const {createHash} = require("crypto");
const Table = require('cli-table');
const ecc = require('tiny-secp256k1');
const bip39 = require("bip39");

import { Address, DecoratedUtxo } from "../types";
import {
    deriveChildPublicKey,
    getAddressFromChildPubkey,
    getMasterPrivateKey,
    getXpubFromPrivateKey
} from "./bitcoinjs-lib";
import {Network} from "ecpair/src/types";

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
            const table = new Table({
                head: ['#', 'Labels ', 'Addresses'],
                colWidths: [16, 16, 12]
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

    await findWallet(walletLabel).then( async wallet => {
        const network = Network.regtest;

        if (wallet != null) {
            const mnemonic = wallet.mnemonic;
//            console.log("Mnemonic");
//            console.log("    > "+ mnemonic);
//            console.log("");

            const masterPrivateKey = await getMasterPrivateKey(mnemonic, network);
//            console.log("Master Private Key ");
//            console.log("    > "+ masterPrivateKey.toBase58());
//            console.log("");

            const derivativePath = "m/84'/0'/0'/0";
            const addressType = "bech32";
            const xPub = getXpubFromPrivateKey(masterPrivateKey, derivativePath);
//            console.log("xPub Key");
//            console.log("    > "+ xPub);
//            console.log("");

            // get the latest index
            const latestIndex = await getWalletLatestIndex(wallet.id);
            const childDerivativePath = latestIndex +"";
            const childPubKey = await deriveChildPublicKey(xPub, network, childDerivativePath);
//            console.log("Child Pub Key");
//            console.log("    > "+ childPubKey.toBase58());
//            console.log("");

            const address = getAddressFromChildPubkey(childPubKey, network);
//            console.log("Address");
//            console.log("    > "+ address.address);
//            console.log("");

            storeAddress(address.address!, latestIndex, wallet.id, addressType).then(a => {
                console.log(chalk.green(""));
                console.log(chalk.green("        [✔] Address Genereated"));
                console.log(chalk.green("            Address ["+ latestIndex +"] -> "+ address.address));
            });
        } else {
            console.log(chalk.yellow("    [✗] No wallets found. First, create a wallet with the command `create --label=<my-label>`", wallet));
        }
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
