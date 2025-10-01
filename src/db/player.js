import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPlayers() {
    return prisma.player.findMany();
}

export async function getPlayerById(id) {
    return prisma.player.findUnique({
        where: { id: parseInt(id) },
    });
}

export async function createPlayer(name, color) {
    return prisma.player.create({
        data: { name, color },
    });
}

export async function updatePlayer(id, name, color) {
    return prisma.player.update({
        where: { id: parseInt(id) },
        data: { name, color },
    });
}

export async function deletePlayer(id) {
    return prisma.player.delete({
        where: { id: parseInt(id) },
    });
}