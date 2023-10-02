import { createParticipant } from "protocols";
import { prisma } from "../config/db";

function postParticipant(body: createParticipant){
    return prisma.participant.create({
        data: body
    })
}

function getParticipants(){
    return prisma.participant.findMany()
}

const participantsRepositories = {
    postParticipant,
    getParticipants
}

export default participantsRepositories