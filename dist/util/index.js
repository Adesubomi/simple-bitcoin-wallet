"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTransaction = exports.verifyAddress = exports.getAddresses = exports.generateAddress = exports.getAllWallets = exports.walletCreate = void 0;
const chalk_1 = __importDefault(require("chalk"));
const wallet_1 = require("../data/wallet");
const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory, } = require('bip32');
const { createHash } = require("crypto");
const Table = require('cli-table');
const ecc = require('tiny-secp256k1');
const bip39 = require("bip39");
const bitcoinjs_lib_1 = require("./bitcoinjs-lib");
const types_1 = require("ecpair/src/types");
const generateMnemonic = () => {
    let mnemonic = bip39.generateMnemonic();
    return mnemonic.toString();
};
const walletCreate = (args) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating wallet...");
    const mnemonicString = generateMnemonic();
    const label = createHash('sha256').update(mnemonicString).digest('hex');
    console.log(chalk_1.default.white("    Here is your wallet seed phrase"));
    console.log(chalk_1.default.yellow("        NOTE: You won't be able to see this seed phrase again after now."));
    console.log(chalk_1.default.yellow("        NOTE: Please keeep it safe. There is no way to recover your funds if you lose it."));
    console.log("");
    console.log(chalk_1.default.white("    Label: " + label));
    console.log(chalk_1.default.white("    Seed Phrase: " + mnemonicString));
    (0, wallet_1.storeSeedPhrase)(mnemonicString, label).then(w => {
        console.log(chalk_1.default.green(""));
        console.log(chalk_1.default.green("        [✔] Wallet created"));
    });
});
exports.walletCreate = walletCreate;
const getAllWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, wallet_1.getWallets)().then(wallets => {
        if (wallets && wallets.length > 0) {
            const table = new Table({
                head: ['#', 'Labels ', 'Addresses'],
                colWidths: [16, 16, 12]
            });
            const parsedWallets = wallets.map(walletX => {
                return {
                    hash: walletX.hash,
                    label: walletX.label.toString().substring(0, 7) + "...",
                    addressCount: 0,
                };
            });
            parsedWallets.forEach(parsedWallet => {
                table.push([
                    parsedWallet.hash,
                    parsedWallet.label,
                    parsedWallet.addressCount,
                ]);
            });
            console.log(table.toString());
        }
        else {
            console.log(chalk_1.default.yellow("    [~] No wallets found. Create a new wallet with the `create` command"));
        }
    });
});
exports.getAllWallets = getAllWallets;
const generateAddress = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const walletLabel = args.wallet.toString();
    yield (0, wallet_1.findWallet)(walletLabel).then((wallet) => __awaiter(void 0, void 0, void 0, function* () {
        const network = types_1.Network.regtest;
        if (wallet != null) {
            const mnemonic = wallet.mnemonic;
            //            console.log("Mnemonic");
            //            console.log("    > "+ mnemonic);
            //            console.log("");
            const masterPrivateKey = yield (0, bitcoinjs_lib_1.getMasterPrivateKey)(mnemonic, network);
            //            console.log("Master Private Key ");
            //            console.log("    > "+ masterPrivateKey.toBase58());
            //            console.log("");
            const derivativePath = "m/84'/0'/0'/0";
            const addressType = "bech32";
            const xPub = (0, bitcoinjs_lib_1.getXpubFromPrivateKey)(masterPrivateKey, derivativePath);
            //            console.log("xPub Key");
            //            console.log("    > "+ xPub);
            //            console.log("");
            // get the latest index
            const latestIndex = yield (0, wallet_1.getWalletLatestIndex)(wallet.id);
            const childDerivativePath = latestIndex + "";
            const childPubKey = yield (0, bitcoinjs_lib_1.deriveChildPublicKey)(xPub, network, childDerivativePath);
            //            console.log("Child Pub Key");
            //            console.log("    > "+ childPubKey.toBase58());
            //            console.log("");
            const address = (0, bitcoinjs_lib_1.getAddressFromChildPubkey)(childPubKey, network);
            //            console.log("Address");
            //            console.log("    > "+ address.address);
            //            console.log("");
            (0, wallet_1.storeAddress)(address.address, latestIndex, wallet.id, addressType).then(a => {
                console.log(chalk_1.default.green(""));
                console.log(chalk_1.default.green("        [✔] Address Genereated"));
                console.log(chalk_1.default.green("            Address [" + latestIndex + "] -> " + address.address));
            });
        }
        else {
            console.log(chalk_1.default.yellow("    [✗] No wallets found. First, create a wallet with the command `create --label=<my-label>`", wallet));
        }
    }));
});
exports.generateAddress = generateAddress;
const getAddresses = (args) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.getAddresses = getAddresses;
const verifyAddress = (args) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.verifyAddress = verifyAddress;
const newTransaction = (args) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.newTransaction = newTransaction;
