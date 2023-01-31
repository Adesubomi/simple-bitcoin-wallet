import { BIP32Interface } from "bip32";
import { payments, Psbt } from "bitcoinjs-lib";
import { Address, DecoratedUtxo } from "../types";
import { Network } from 'bitcoinjs-lib';
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require('bip32')

const bip32 = BIP32Factory(ecc);

const bip39 = require("bip39");

export const getNewMnemonic = (): string => {
    return bip39.generateMnemonic().toString();
};

export const getMasterPrivateKey = async (
        mnemonic: string,
        network: Network,
        ): Promise<BIP32Interface> => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return bip32.fromSeed(seed, network);
};

export const getXpubFromPrivateKey = (
        privateKey: BIP32Interface,
        derivationPath: string
        ): string => {
    // derivationPath looks like
    //     -> "m/44'/0'/0'" -> P2PKH (native)
    //     -> "m/49'/0'/0'" -> P2SH (segwit)
    //     -> "m/84'/0'/0'" -> P2WPKH (bech32)
    const child = privateKey.derivePath(derivationPath).neutered();
    return child.toBase58();
};

export const deriveChildPublicKey = (
        xpub: string,
        network: Network,
        derivationPath: string
        ): BIP32Interface => {
    const node = bip32.fromBase58(xpub, network);
    return node.derivePath(derivationPath);
};

export const getAddressFromChildPubkey = (
        child: BIP32Interface,
        network: Network,
        ): payments.Payment => {
    return payments.p2wpkh({
        pubkey: child.publicKey,
        network: network,
    });
};

export const createTransaction = async (
        utxos: DecoratedUtxo[],
        recipientAddress: string,
        amountInSatoshis: number,
        changeAddress: Address
        ): Promise<Psbt> => {
    throw new Error("Function not implemented yet");
};

export const signTransaction = async (
        psbt: any,
        mnemonic: string
        ): Promise<Psbt> => {
    throw new Error("Function not implemented yet");
};

