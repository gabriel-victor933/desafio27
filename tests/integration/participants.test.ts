import supertest from 'supertest';
import app from '../../src/app';
import httsCodeMap from '../helpers/httpsMaps';
import { createParticipant } from '../factories/applicationFactories';

const server = supertest(app)

describe("Participants /POST routes",()=>{

    it("should return 400 when body is invalid",async ()=>{
        const res = await server.post("/participants").send({})
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return 400 when balance is insuficient",async ()=>{
        const res = await server.post("/participants").send(createParticipant(false))
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return 201 CREATED when body is valid",async ()=>{
        const res = await server.post("/participants")
        .send(createParticipant())
        expect(res.statusCode).toBe(httsCodeMap.created)
    })
})

describe("Participants /get routes",()=>{
    
})