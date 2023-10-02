import {Request, Response} from "express"
import { createGame } from "../utils/protocols"
import gamesServices from "../services/gamesService"

export async function PostGame(req: Request, res: Response){
    try{
        const body = req.body as createGame
        await gamesServices.PostGame(body)
        return res.sendStatus(201)
    } catch(err){
        console.log(err)
        return res.status(500).send("server error!")
    }
}

export async function getGame(req: Request, res: Response){
    try{
        
        const games = await gamesServices.getGame()
        return res.send(games)
    } catch(err){
        console.log(err)
        return res.status(500).send("server error!")
    }
}