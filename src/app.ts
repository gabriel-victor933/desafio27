import Express,{Request, Response} from "express"
import participantsRouter from "./routes/participantsRoutes";
import { connectDb } from "./config/db";

connectDb()

const app = Express()
app.use(Express.json())
app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use(participantsRouter)
export default app
