import {Router, Request, Response} from "express"
import {postParticipants,getParticipants} from "../controllers/participantsControllers"
import {validateCreateParticipant} from "../middlewares/participantsMiddleware"

const participantsRouter = Router()
participantsRouter
    .post("",validateCreateParticipant,postParticipants)
    .get("",getParticipants)
export default participantsRouter