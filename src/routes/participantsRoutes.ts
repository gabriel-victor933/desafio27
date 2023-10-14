import {Router, Request, Response} from "express"
import {postParticipants,getParticipants} from "../controllers/participantsControllers"
import { validateBody } from "../middlewares/validateBody"
import { participantSchema } from "../schemas/ParticipantsSchema"
import { sanatizeInput } from "../middlewares/sanatizeInputMiddleware"

const participantsRouter = Router()
participantsRouter
    .post("",validateBody(participantSchema),sanatizeInput,postParticipants)
    .get("",getParticipants)
export default participantsRouter