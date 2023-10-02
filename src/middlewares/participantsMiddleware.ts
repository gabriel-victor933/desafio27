import {Request, Response, Next} from "express"
import { participantSchema } from "../schemas/ParticipantsSchema"

export async function validateCreateParticipant(req: Request, res: Response, next: Next){
    const {error, value} = participantSchema.validate(req.body,{abortEarly: false})
    if(error){
        return res.status(400).send({type: "invalid body!",message: error.message})
    }
    next()
}