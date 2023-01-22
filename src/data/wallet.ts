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
    return await prisma.wallet.findUnique({
        where: {
            hash: id,
        }
    })
}