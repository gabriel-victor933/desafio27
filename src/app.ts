import Express,{Request, Response} from "express"
import 'express-async-errors';
import participantsRouter from "./routes/participantsRoutes";
import gamesRouter from "./routes/gamesRoutes";
import { connectDb } from "./config/db";
import betsRouter from "./routes/betsRoutes";
import { handleApplicationErrors } from "./middlewares/errorHandler";


connectDb()

const app = Express()
app.use(Express.json())
app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use("/participants",participantsRouter)
app.use("/games",gamesRouter)
app.use("/bets",betsRouter)
app.use(handleApplicationErrors)
export default app
