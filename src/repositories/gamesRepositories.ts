import { prisma } from "../config/db";
import { createGame } from "../utils/protocols";

function postGames(body: createGame){
    return prisma.game.create({
        data: body
    })
}

function getGames(){
    return prisma.game.findMany()
}

const gamesRepositories = {
    postGames,
    getGames
}

export default gamesRepositories