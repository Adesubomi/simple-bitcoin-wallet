"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAddress = exports.getWalletLatestIndex = exports.findWallet = exports.getWallets = exports.storeSeedPhrase = void 0;
const client_1 = require("@prisma/client");
const { createHash } = require('crypto');
const prisma = new client_1.PrismaClient();
const storeSeedPhrase = (mnemonic, label) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = createHash('sha256').update(mnemonic).digest('hex');
    return yield prisma.wallet.create({
        data: {
            label: label,
            hash: hash,
            mnemonic: mnemonic,
        },
    }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        prisma.$disconnect();
        yield Promise.resolve();
    }));
});
exports.storeSeedPhrase = storeSeedPhrase;
const getWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.wallet.findMany();
});
exports.getWallets = getWallets;
const findWallet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.wallet.findFirst({
        where: {
            hash: {
                contains: id,
            }
        }
    });
});
exports.findWallet = findWallet;
const getWalletLatestIndex = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.address.findFirst({
        where: {
            id: id,
        },
        orderBy: {
            index: "desc"
        }
    }).then(address => {
        if (address != null) {
            return (address.index + 1);
        }
        return 0;
    });
});
exports.getWalletLatestIndex = getWalletLatestIndex;
const storeAddress = (address, index, walletId, addrType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.address.create({
        data: {
            index: index,
            address: address,
            wallet_id: walletId,
            type: addrType,
        },
    }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        prisma.$disconnect();
        yield Promise.resolve();
    }));
});
exports.storeAddress = storeAddress;
