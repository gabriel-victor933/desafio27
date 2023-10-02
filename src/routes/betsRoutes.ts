import { postBet } from "../controllers/betsControllers"
import {Router} from "express"
import { validateBody } from "../middlewares/validateBody"
import { betSchema } from "../schemas/BetSchema"

const betsRouter = Router()

betsRouter
    .post("",validateBody(betSchema),postBet)

export default betsRouter