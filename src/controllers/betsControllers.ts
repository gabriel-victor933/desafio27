import {Request, Response} from "express"
import betsServices from "../services/betsService"
import { createBet } from "utils/protocols"

export async function postBet(req: Request,res: Response) {
    try {
        const body = req.body as createBet
        await betsServices.postBet(body)
        return res.sendStatus(201)
    } catch(err){
        console.log(err)
        if(err?.type === "application") return res.status(err.code).send(err.message)
        return res.sendStatus(500)
    }
}