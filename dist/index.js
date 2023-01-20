#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clear = require('clear');
const { Command, Option } = require('commander');
const bitcoinjs_lib_1 = require("./util/bitcoinjs-lib");
clear();
const program = new Command();
program
    .name("simple-btc")
    .description(`A simple bitcoin wallet cli tool based off tabConf-workshop ` +
    `tutorial: https://www.youtube.com/watch?v=Bwz2P2hPVpk`)
    .version('0.0.1');
program
    .command("create")
    .action(bitcoinjs_lib_1.walletCreate);
program
    .command("get-wallets")
    .action(bitcoinjs_lib_1.getAllWallets);
program
    .command("generate-address")
    .description("Generate a new address under a wallet")
    .requiredOption("-w, --wallet <type>", "Wallet for which to generate an address")
    .action(bitcoinjs_lib_1.generateAddress);
program
    .command("new-trx")
    .action(bitcoinjs_lib_1.newTransaction);
program.parse(process.argv);
