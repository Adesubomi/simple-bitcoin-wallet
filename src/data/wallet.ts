import { PrismaClient } from "@prisma/client";

const { createHash } = require('crypto');
const prisma = new PrismaClient();

export const storeSeedPhrase = async (mnemonic: string, label: string): Promise<void | any> => {
    const hash = createHash('sha256').update(mnemonic).digest('hex');
    return await prisma.wallet.create({
        data: {
            label: label,
            hash: hash,
            mnemonic: mnemonic,
        },
    }).then( async () => {
        prisma.$disconnect();
        await Promise.resolve();
    });
}

export const getWallets = async (): Promise<void | any[]> => {
    return await prisma.wallet.findMany();
}

export const findWallet = async (id: string): Promise<void | any> => {
    return await prisma.wallet.findFirst({
        where: {
            hash: {
                contains: id,
            }
        }
    })
}

export const getWalletLatestIndex = async (id: number): Promise<void | any> => {
    return await prisma.address.findFirst({
        where: {
            id: id,
        },
        orderBy: {
            index: "desc"
        }
    }).then( address => {
        if (address != null) {
            return (address.index+1);
        }

        return 0;
    });
}

export const storeAddress = async (address: string, index: number, walletId: number, addrType: string): Promise<void | any> => {
    return await prisma.address.create({
        data: {
            index: index,
            address: address,
            wallet_id: walletId,
            type: addrType,
        },
    }).then( async () => {
        prisma.$disconnect();
        await Promise.resolve();
    });
}