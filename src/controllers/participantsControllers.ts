import {Request, Response} from "express"
import { createParticipant } from "protocols"

export async function postParticipants(req: Request, res: Response){
    try{
        const infos = req.body as createParticipant
        if(infos.balance < 1000) return res.status(400).send("invalid balance!")

        return res.send("ok")
    } catch(err){
        console.log(err)
        return res.status(500).send("server error")
    }
}