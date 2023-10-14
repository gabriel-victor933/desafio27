import Joi from "joi";
import { createBet } from "../utils/protocols";

const errorsMessages = {
    "number.base":"Field {#label} must be a number",
    'any.required': 'Field {#label} is required',
}

export const betSchema = Joi.object<createBet>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
    amountBet: Joi.number().required(),
    gameId: Joi.number().required(),
    participantId: Joi.number().required()
}).messages(errorsMessages)