import {Request, Response} from "express"
import betsServices from "../services/betsService"
import { createBet } from "utils/protocols"

export async function postBet(req: Request, res: Response) {
    const body = req.body as createBet
    await betsServices.postBet(body)
    return res.sendStatus(201)

}