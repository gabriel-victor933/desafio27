import {Request, Response} from "express"
import { createParticipant } from "../utils/protocols"
import participantServices from "../services/participantsService"

export async function postParticipants(req: Request, res: Response) {
    const infos = req.body as createParticipant
    if (infos.balance < 1000) return res.status(400).send("invalid balance!")
    await participantServices.postParticipant(infos)
    return res.sendStatus(201)

}

export async function getParticipants(req: Request, res: Response) {

    const part = await participantServices.getParticipants()
    return res.send(part)

}