import {Router, Request, Response} from "express"
import {postParticipants} from "../controllers/participantsControllers"
import {validateCreateParticipant} from "../middlewares/participantsMiddleware"

const participantsRouter = Router()
participantsRouter
    .post("/participants",validateCreateParticipant,postParticipants)
    .get("/participants",(req: Request, res: Response) => res.send("ok!"))
export default participantsRouter