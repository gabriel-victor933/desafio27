import {Router, Request, Response} from "express"
import {postParticipants,getParticipants} from "../controllers/participantsControllers"
import {validateCreateParticipant} from "../middlewares/participantsMiddleware"

const participantsRouter = Router()
participantsRouter
    .post("/participants",validateCreateParticipant,postParticipants)
    .get("/participants",getParticipants)
export default participantsRouter