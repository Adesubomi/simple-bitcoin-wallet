#!/usr/bin/env node
const clear = require('clear');
const { Command, Option } = require('commander');
import {
    walletCreate,
    getAllWallets,
    generateAddress,
    newTransaction, } from "./util/bitcoinjs-lib";

clear();
const program = new Command();

program
    .name("simple-btc")
    .description(`A simple bitcoin wallet cli tool based off tabConf-workshop `+
               `tutorial: https://www.youtube.com/watch?v=Bwz2P2hPVpk`)
    .version('0.0.1');

program
    .command("create")
    .action( walletCreate );

program
    .command("get-wallets")
    .action( getAllWallets );

program
    .command("generate-address")
    .description("Generate a new address under a wallet")
    .requiredOption("-w, --wallet <type>", "Wallet for which to generate an address")
    .action( generateAddress );

program
    .command("new-trx")
    .action( newTransaction );

program.parse(process.argv);




