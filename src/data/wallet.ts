import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const storeSeedPhrase = async (mnemonic: string, label: string): Promise<void | any> => {
    return await prisma.wallet.create({
        data: { label, mnemonic },
    }).then( async () => {
        prisma.$disconnect();
        await Promise.resolve();
    });
}

export const getWallets = async (): Promise<void | any[]> => {
    return await prisma.wallet.findMany();
}