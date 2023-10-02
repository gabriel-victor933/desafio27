import Joi from "joi";
import { createBet } from "../utils/protocols";

export const betSchema = Joi.object<createBet>({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
    amountBet: Joi.number().required(),
    gameId: Joi.number().required(),
    participantId: Joi.number().required()
})