import {Request,Response,Next} from "express"
import { ObjectSchema } from "joi"
export function validateBody(schema: ObjectSchema){
    return (req: Request,res: Response,next: Next) =>{
        const {error} = schema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(400).send({type: "invalid body!",message: error.message})
        }
        next()
    }
}