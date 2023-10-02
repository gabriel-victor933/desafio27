import Express,{Request, Response} from "express"
import participantsRouter from "./routes/participantsRoutes";

const app = Express()
app.use(Express.json())
app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use(participantsRouter)
export default app
