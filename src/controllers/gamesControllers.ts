import {Request, Response} from "express"
import { createGame, finishGame } from "../utils/protocols"
import gamesServices from "../services/gamesService"
import { invalidRequestException } from "../utils/errors"

export async function PostGame(req: Request, res: Response) {
    const body = req.body as createGame
    await gamesServices.PostGame(body)
    return res.sendStatus(201)

}

export async function getGame(req: Request, res: Response) {
    const games = await gamesServices.getGame()
    return res.send(games)

}

export async function getGameById(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (isNaN(id)) throw invalidRequestException()
    const game = await gamesServices.getGameById(id)
    return res.send(game)
}

export async function postFinishGame(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const body = req.body as finishGame
    if (isNaN(id)) throw invalidRequestException()
    const game = await gamesServices.postFinishGame(id,body)
    return res.send(game)
}