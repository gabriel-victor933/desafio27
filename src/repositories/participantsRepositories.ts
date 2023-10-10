import { createParticipant } from "../utils/protocols";
import { prisma } from "../config/db";

function postParticipant(body: createParticipant){
    return prisma.participant.create({
        data: body
    })
}

function getParticipants(page: number){
    return prisma.participant.findMany({
        take: 10,
        skip: 10*(page -1)
    })
}

const participantsRepositories = {
    postParticipant,
    getParticipants
}

export default participantsRepositories