import { payments } from "bitcoinjs-lib";
import { BlockstreamAPIUtxoResponse } from "./blockstream";

export interface Address extends payments.Payment {
    derivationPath: string;
    masterFingerprint: Buffer;
    type?: "used" | "unused";
}

export interface DecoratedUtxo extends BlockstreamAPIUtxoResponse {
    address: Address;
    bip32Derivation: {
        masterFingerprint: Buffer;
        pubkey: Buffer;
        path: string;
    }[];
}