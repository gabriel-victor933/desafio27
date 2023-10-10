import { invalidRequestException } from "../utils/errors";
import { prisma } from "../config/db";
import { createGame, finishGame,BetsResults } from "../utils/protocols";

function postGames(body: createGame){
    return prisma.game.create({
        data: body
    })
}

function getGames(page: number){
    return prisma.game.findMany({
        take: 10,
        skip: 10*(page -1)
    })
}

function getGamesById(id: number){
    return prisma.game.findFirst({
        where: {id: id},
        include: {bets: true}    
    })
}

function postFinishGame(id: number, body: finishGame,betsLosted: number[], betsResults: BetsResults[]){
    const querys = []
    querys.push(prisma.game.update({
        where: {id: id},
        data: {
            isFinished: true,
            homeTeamScore: body.homeTeamScore,
            awayTeamScore: body.awayTeamScore
        }
    }))

    querys.push(prisma.bet.updateMany({
        where: {id: {in: betsLosted}},
        data: {
            status: "LOST",
            amountWon: 0
        }
    }))

    betsResults.forEach((bet)=> {
        querys.push(prisma.bet.update({
            where: {id: bet.id},
            data: {
                amountWon: bet.amountWon,
                status: "WIN"
            }
        }))

        querys.push(prisma.participant.update({
            where: {id: bet.participantId},
            data: {
                balance: {increment: bet.amountWon}
            }
        }))
    })

    return prisma.$transaction(querys)
}

const gamesRepositories = {
    postGames,
    getGames,
    getGamesById,
    postFinishGame
}

export default gamesRepositories

