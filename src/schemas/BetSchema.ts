import Joi from "joi";
import { createBet } from "../utils/protocols";

const errorsMessages = {
    "number.base":"Field {#label} must be a number",
    "number.integer":"Field {#label} must be a integer",
    "number.min": "Field {#label} must be greater than 0",
    'any.required': 'Field {#label} is required',
}

export const betSchema = Joi.object<createBet>({
    homeTeamScore: Joi.number().integer().min(0).message("Field Score must be greater or equal than 0").required(),
    awayTeamScore: Joi.number().integer().min(0).message("Field Score must be greater or equal than 0").required(),
    amountBet: Joi.number().integer().min(1).required(),
    gameId: Joi.number().integer().required(),
    participantId: Joi.number().integer().required()
}).messages(errorsMessages)