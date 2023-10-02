import {Router} from 'express'
import {validateGamesPost} from "../middlewares/gamesMiddleware"
import { PostGame, getGame } from '../controllers/gamesControllers'


const gamesRouter = Router()

gamesRouter
    .post("",validateGamesPost,PostGame)
    .get("",getGame)

export default gamesRouter