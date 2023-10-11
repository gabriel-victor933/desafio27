import { createParticipant } from "../utils/protocols";
import participantsRepositories from "../repositories/participantsRepositories";
import { notFoundException } from "../utils/errors";

async function postParticipant(body: createParticipant ) {
     const res = await participantsRepositories.postParticipant(body)
     return {participantId: res.id}
}

async function getParticipants(page: number) {
    const participants = await participantsRepositories.getParticipants(page)
    if(participants.length === 0 ) throw notFoundException("Participants not found!")
    return participants
}   

const participantServices = {
    postParticipant,
    getParticipants
}

export default participantServices