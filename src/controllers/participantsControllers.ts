import {Request, Response} from "express"
import { createParticipant } from "protocols"
import participantServices from "../services/participantsService"

export async function postParticipants(req: Request, res: Response){
    try{
        const infos = req.body as createParticipant
        if(infos.balance < 1000) return res.status(400).send("invalid balance!")
        await participantServices.postParticipant(infos)
        return res.send("ok")
    } catch(err){
        console.log(err)
        return res.status(500).send("server error")
    }
}

export async function getParticipants(req: Request, res: Response) {
    try {
        const part = await participantServices.getParticipants()
        return res.send(part)
    } catch(err){
        console.log(err)
        return res.status(500).send("server error")
    }
}