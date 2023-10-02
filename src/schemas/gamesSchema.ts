import Joi from "joi";
import { createGame } from "../utils/protocols";

export const gameSchema = Joi.object<createGame>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
})