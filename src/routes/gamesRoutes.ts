import {Router} from 'express'
import { PostGame, getGame, getGameById, postFinishGame } from '../controllers/gamesControllers'
import { validateBody } from '../middlewares/validateBody'
import { finishGameSchema, gameSchema } from '../schemas/gamesSchema'


const gamesRouter = Router()

gamesRouter
    .post("",validateBody(gameSchema),PostGame)
    .get("",getGame)
    .get("/:id",getGameById)
    .post("/:id/finish",validateBody(finishGameSchema),postFinishGame)

export default gamesRouter