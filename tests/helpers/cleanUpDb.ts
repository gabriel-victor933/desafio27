import {prisma} from "../../src/config/db"

export async function cleanUpDb(){
    await prisma.bet.deleteMany({})
    await prisma.game.deleteMany({})
    await prisma.participant.deleteMany({})
}