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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = exports.createTransaction = exports.getAddressFromChildPubkey = exports.deriveChildPublicKey = exports.getXpubFromPrivateKey = exports.getMasterPrivateKey = exports.getNewMnemonic = void 0;
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const bip39 = require("bip39");
const getNewMnemonic = () => {
    return bip39.generateMnemonic().toString();
};
exports.getNewMnemonic = getNewMnemonic;
const getMasterPrivateKey = (mnemonic, network) => __awaiter(void 0, void 0, void 0, function* () {
    const seed = yield bip39.mnemonicToSeed(mnemonic);
    return bip32.fromSeed(seed, network);
});
exports.getMasterPrivateKey = getMasterPrivateKey;
const getXpubFromPrivateKey = (privateKey, derivationPath) => {
    // derivationPath looks like
    //     -> "m/44'/0'/0'" -> P2PKH (native)
    //     -> "m/49'/0'/0'" -> P2SH (segwit)
    //     -> "m/84'/0'/0'" -> P2WPKH (bech32)
    const child = privateKey.derivePath(derivationPath).neutered();
    return child.toBase58();
};
exports.getXpubFromPrivateKey = getXpubFromPrivateKey;
const deriveChildPublicKey = (xpub, network, derivationPath) => {
    const node = bip32.fromBase58(xpub, network);
    return node.derivePath(derivationPath);
};
exports.deriveChildPublicKey = deriveChildPublicKey;
const getAddressFromChildPubkey = (child, network) => {
    return bitcoinjs_lib_1.payments.p2wpkh({
        pubkey: child.publicKey,
        network: network,
    });
};
exports.getAddressFromChildPubkey = getAddressFromChildPubkey;
const createTransaction = (utxos, recipientAddress, amountInSatoshis, changeAddress) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.createTransaction = createTransaction;
const signTransaction = (psbt, mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    throw new Error("Function not implemented yet");
});
exports.signTransaction = signTransaction;
