"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddress = exports.walletCreate = void 0;
const bip39 = require("bip39");
const generateMnemonic = () => {
    let mnemonic = bip39.generateMnemonic();
    let mnemonicString = mnemonic.toString();
    return [mnemonicString];
};
const walletCreate = (args) => {
    console.log("Ready to create wallets");
    console.log("    args - - ", args);
    console.log(generateMnemonic());
};
exports.walletCreate = walletCreate;
const generateAddress = (args) => {
    console.log("This command should generate an address");
    console.log("    args - - ", args);
};
exports.generateAddress = generateAddress;
