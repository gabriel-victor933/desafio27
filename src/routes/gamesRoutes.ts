import {Router} from 'express'
import { PostGame, getGame, getGameById } from '../controllers/gamesControllers'
import { validateBody } from '../middlewares/validateBody'
import { gameSchema } from '../schemas/gamesSchema'


const gamesRouter = Router()

gamesRouter
    .post("",validateBody(gameSchema),PostGame)
    .get("",getGame)
    .get("/:id",getGameById)

export default gamesRouter