import {Router} from 'express'
import { PostGame, getGame } from '../controllers/gamesControllers'
import { validateBody } from '../middlewares/validateBody'
import { gameSchema } from '../schemas/gamesSchema'


const gamesRouter = Router()

gamesRouter
    .post("",validateBody(gameSchema),PostGame)
    .get("",getGame)

export default gamesRouter