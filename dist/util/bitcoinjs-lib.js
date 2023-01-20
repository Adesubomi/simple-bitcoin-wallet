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
exports.newTransaction = exports.generateAddress = exports.getAllWallets = exports.walletCreate = void 0;
const bip39 = require("bip39");
const chalk_1 = __importDefault(require("chalk"));
const wallet_1 = require("../data/wallet");
const { createHash } = require('crypto');
const Table = require('cli-table');
const generateMnemonic = () => {
    let mnemonic = bip39.generateMnemonic();
    return mnemonic.toString();
};
const walletCreate = (args) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Ready to create wallets");
    //    console.log("    args - - ", args);
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
                head: ['ID', 'Labels ', 'Addresses'],
                colWidths: [4, 12, 12]
            });
            const parsedWallets = wallets.map(walletX => {
                return {
                    id: walletX.id,
                    label: walletX.label.toString().substring(0, 7) + "...",
                    addressCount: 0,
                };
            });
            parsedWallets.forEach(parsedWallet => {
                table.push([parsedWallet.id, parsedWallet.label]);
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
    console.log(args);
    console.log(typeof args);
});
exports.generateAddress = generateAddress;
const newTransaction = (args) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, wallet_1.getWallets)().then(wallets => {
    });
    console.log("This command should construct a transaction");
    console.log("    args - - ", args);
});
exports.newTransaction = newTransaction;
