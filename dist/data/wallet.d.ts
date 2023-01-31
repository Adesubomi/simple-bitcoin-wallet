export declare const storeSeedPhrase: (mnemonic: string, label: string) => Promise<void | any>;
export declare const getWallets: () => Promise<void | any[]>;
export declare const findWallet: (id: string) => Promise<void | any>;
export declare const getWalletLatestIndex: (id: number) => Promise<void | any>;
export declare const storeAddress: (address: string, index: number, walletId: number, addrType: string) => Promise<void | any>;
