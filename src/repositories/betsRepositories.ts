import { createBet } from "../utils/protocols";
import { prisma } from "../config/db";
import { balanceRequired, forbiddenException, notFoundException } from "../utils/errors";

function postBet(body: createBet){
    return prisma.$transaction(async (tx)=>{
        const participant = await tx.participant.findFirst({where: {id: body.participantId}})
        if(!participant) throw notFoundException("Participant Not Found!")
        const game = await tx.game.findFirst({where: {id: body.gameId}})
        if(!game) throw notFoundException("Game Not Found!")

        if(game.isFinished) throw forbiddenException("Game have already finished!")

        if(body.amountBet > participant.balance) throw balanceRequired()

        await tx.participant.update({
            where: {id: body.participantId},
            data: {balance: participant.balance - body.amountBet}
        })

        await tx.bet.create({
            data: body
        })
    })
}

const betsRepositories = {
    postBet
}

export default betsRepositories