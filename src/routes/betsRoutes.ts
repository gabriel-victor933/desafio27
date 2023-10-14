import { postBet } from "../controllers/betsControllers"
import {Router} from "express"
import { validateBody } from "../middlewares/validateBody"
import { betSchema } from "../schemas/BetSchema"
import { sanatizeInput } from "../middlewares/sanatizeInputMiddleware"

const betsRouter = Router()

betsRouter
    .post("",validateBody(betSchema),sanatizeInput,postBet)

export default betsRouter