import {Next, Request, Response} from "express"
import xss from "xss";

export function sanatizeInput(req: Request,res: Response,next: Next){
    const keys = Object.keys(req.body);
    keys.forEach((key)=>{
        if(typeof req.body[key] == "string") req.body[key] = xss(req.body[key]);
    })
    next()
}