import Joi from "joi";
import { createGame, finishGame } from "../utils/protocols";

const errorsMessages = {
    "string.base": "Field {#label} must be a string",
    "number.base":"Field {#label} must be a number",
    'any.required': 'Field {#label} is required',
}

export const gameSchema = Joi.object<createGame>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
}).messages(errorsMessages)

export const finishGameSchema = Joi.object<finishGame>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required()
}).messages(errorsMessages)