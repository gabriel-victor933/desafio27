import {Request,Response,Next} from "express"
import { gameSchema } from "../schemas/gamesSchema"

export function validateGamesPost(req: Request, res: Response,next: Next){
    const {error} = gameSchema.validate(req.body)
    if(error){
        return res.status(400).send({type: "invalid body!",message: error.message})
    }
    next()
}