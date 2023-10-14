import Joi from "joi";
import { createGame, finishGame } from "../utils/protocols";

const errorsMessages = {
    "string.base": "Field {#label} must be a string",
    "number.base":"Field {#label} must be a number",
    "number.integer":"Field {#label} must be a integer",
    'any.required': 'Field {#label} is required',
}

export const gameSchema = Joi.object<createGame>({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required()
}).messages(errorsMessages)

export const finishGameSchema = Joi.object<finishGame>({
    homeTeamScore: Joi.number().integer().min(0).message("Field Score must be greater or equal than 0").required(),
    awayTeamScore: Joi.number().integer().min(0).message("Field Score must be greater or equal than 0").required()
}).messages(errorsMessages)