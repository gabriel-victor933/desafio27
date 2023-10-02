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

function getGamesById(id: number){
    return prisma.game.findFirst({
        where: {id: id},
        include: {bets: true}    
    })
}

const gamesRepositories = {
    postGames,
    getGames,
    getGamesById
}

export default gamesRepositories