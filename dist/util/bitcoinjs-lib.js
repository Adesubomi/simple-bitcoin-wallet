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
exports.signTransaction = exports.createTransasction = exports.getAddressFromChildPubkey = exports.deriveChildPublicKey = exports.getXpubFromPrivateKey = exports.getMasterPrivateKey = exports.getNewMnemonic = exports.newTransaction = exports.generateAddress = exports.getAllWallets = exports.walletCreate = void 0;
const chalk_1 = __importDefault(require("chalk"));
const wallet_1 = require("../data/wallet");
const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory } = require('bip32');
const { createHash } = require("crypto");
const Table = require('cli-table');
const ecc = require('tiny-secp256k1');
const bip39 = require("bip39");
const bip32 = BIP32Factory(ecc);
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
            console.log(wallets);
            const table = new Table({
                head: ['#', 'Labels ', 'Addresses'],
                colWidths: [12, 12, 12]
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
    // - - - - - - -
    const network = bitcoin.networks.regtest;
    const mnemonic = bip39.generateMnemonic(256);
    const seed = yield bip39.mnemonicToSeed(mnemonic);
    const privateKey = bip32.fromSeed(seed, network);
    console.log(privateKey.toBase58());
    // - - - - - - -
    //    const network = bitcoin.networks.regtest;
    //    const mnemonic = 'obscure chuckle obscure between cigar spirit venue wild slush foot kangaroo satoshi';
    //    const path = `m/49'/0'/0'`;
    //    const seed = bip39.mnemonicToSeedSync(mnemonic);
    //    const root = bip32.fromSeed(seed, );
    //
    //    const account = root.derivePath(path);
    //    const node = account.derive(0).derive(0);
    //
    //    const btcAddress = bitcoin.payments.p2pkh({
    //        pubkey: node.publicKey,
    //        network: network,
    //    }).address
    //
    //    const segwitAddress = bitcoin.payments.p2sh({
    //        redeem: bitcoin.payments.p2wpkh({
    //            pubkey: node.publicKey,
    //            network: network,
    //        }),
    //        network: network,
    //    }).address;
    //
    //    console.log(`Bitcoin address: ${btcAddress}`);
    //    console.log(`SegWit address: ${segwitAddress}`);
    //        let wallet = await findWallet(walletLabel).then( wallet => {
    //                    const masterNode = bitcoin.HDNode.
    //            fromSeedBuffer(Buffer.from(seed, 'hex'), bitcoin.networks.testnet);
    //
    //        const path = "m/44'/0'/0'/0/0";
    //
    //        const { address } = bitcoin.payments
    //            .p2sh({
    //                redeem: bitcoin.payments.p2wpkh(
    //                        {
    //                            pubkey: bitcoin.bip32.
    //                                fromSeed(seed, bitcoin.networks.testnet).
    //                                derivePath(path).publicKey
    //                        }
    //                )
    //            });
    //
    //        console.log("Generate address for - "+ walletLabel);
    //    } );
    //
    //    console.log(wallet);
});
exports.generateAddress = generateAddress;
const newTransaction = (args) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, wallet_1.getWallets)().then(wallets => {
    });
    console.log("This command should construct a transaction");
    console.log("    args - - ", args);
});
exports.newTransaction = newTransaction;
/** *********************************** * */
/** *********************************** * */
/** TabConf Interface */
const getNewMnemonic = () => {
    throw new Error("Function not implemented yet");
};
exports.getNewMnemonic = getNewMnemonic;
const getMasterPrivateKey = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.getMasterPrivateKey = getMasterPrivateKey;
const getXpubFromPrivateKey = (privateKey, derivationPath) => {
    throw new Error("Function not implemented yet");
};
exports.getXpubFromPrivateKey = getXpubFromPrivateKey;
const deriveChildPublicKey = (xpub, derivationPath) => {
    throw new Error("Function not implemented yet");
};
exports.deriveChildPublicKey = deriveChildPublicKey;
const getAddressFromChildPubkey = (child) => {
    throw new Error("Function not implemented yet");
};
exports.getAddressFromChildPubkey = getAddressFromChildPubkey;
const createTransasction = (utxos, recipientAddress, amountInSatoshis, changeAddress) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.createTransasction = createTransasction;
const signTransaction = (psbt, mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.signTransaction = signTransaction;
