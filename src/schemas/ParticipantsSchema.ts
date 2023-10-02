import Joi from "joi";
import { createParticipant } from "protocols";

export const participantSchema = Joi.object<createParticipant>({
    name: Joi.string().required(),
    balance: Joi.number().required()
})