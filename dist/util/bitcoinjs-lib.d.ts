import { BIP32Interface } from "bip32";
import { payments, Psbt } from "bitcoinjs-lib";
import { Address, DecoratedUtxo } from "../types";
export declare const walletCreate: (args: any[]) => Promise<void>;
export declare const getAllWallets: () => Promise<void>;
export declare const generateAddress: (args: any) => Promise<void>;
export declare const newTransaction: (args: any[]) => Promise<void>;
/** *********************************** * */
/** *********************************** * */
/** TabConf Interface */
export declare const getNewMnemonic: () => string;
export declare const getMasterPrivateKey: (mnemonic: string) => Promise<BIP32Interface>;
export declare const getXpubFromPrivateKey: (privateKey: BIP32Interface, derivationPath: string) => string;
export declare const deriveChildPublicKey: (xpub: string, derivationPath: string) => BIP32Interface;
export declare const getAddressFromChildPubkey: (child: BIP32Interface) => payments.Payment;
export declare const createTransasction: (utxos: DecoratedUtxo[], recipientAddress: string, amountInSatoshis: number, changeAddress: Address) => Promise<Psbt>;
export declare const signTransaction: (psbt: any, mnemonic: string) => Promise<Psbt>;
