#!/usr/bin/env node
const clear = require('clear');
const { Command, Option } = require('commander');
import {
    walletCreate,
    getAllWallets,
    generateAddress,
    newTransaction,
    getAddresses,
    verifyAddress } from "./util";

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
    .command("get-addresses")
    .description("Get list of addresses generated under a wallet")
    .option("-w, --wallet <type>", "Wallet for which to get list of wallets")
    .action( getAddresses );

program
    .command("verify-address")
    .requiredOption("-a, --address", "The address you want to verify")
    .action( verifyAddress );

program
    .command("new-trx") // WIP
    .action( newTransaction );

program.parse(process.argv);
