import Joi from "joi";
import { createParticipant } from "../utils/protocols";

const errorsMessages = {
    "string.base": "Field {#label} must be a string",
    "number.base":"Field {#label} must be a number",
    "number.integer":"Field {#label} must be a integer",
    'any.required': 'Field {#label} is required',
}

export const participantSchema = Joi.object<createParticipant>({
    name: Joi.string().required(),
    balance: Joi.number().integer().required()
}).messages(errorsMessages)

