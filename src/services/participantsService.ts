import { createParticipant } from "protocols";
import participantsRepositories from "../repositories/participantsRepositories";

async function postParticipant(body: createParticipant ) {
     await participantsRepositories.postParticipant(body)
}

async function getParticipants() {
    const participants = await participantsRepositories.getParticipants()
    if(participants.length === 0 ) throw new Error("Participant not found!")
    return participants
}   

const participantServices = {
    postParticipant,
    getParticipants
}

export default participantServices