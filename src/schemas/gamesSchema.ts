import Joi from "joi";
import { createGame, finishGame } from "../utils/protocols";

export const gameSchema = Joi.object<createGame>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
})

export const finishGameSchema = Joi.object<finishGame>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required()
})