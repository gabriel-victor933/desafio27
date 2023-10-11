import {Request, Response} from "express"
import { createParticipant } from "../utils/protocols"
import participantServices from "../services/participantsService"
import { invalidRequestException } from "../utils/errors"

export async function postParticipants(req: Request, res: Response) {
    const infos = req.body as createParticipant
    if (infos.balance < 1000) throw invalidRequestException("insufficient Balance!")
    const participant = await participantServices.postParticipant(infos)
    return res.status(201).send(participant)

}

export async function getParticipants(req: Request, res: Response) {
    const page = parseInt(req.query.page || 1)
    if (isNaN(page)) throw invalidRequestException("Page must be a number!")
    const part = await participantServices.getParticipants(page)
    return res.send(part)

}