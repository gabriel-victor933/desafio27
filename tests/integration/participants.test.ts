import supertest from 'supertest';
import app from '../../src/app';
import httsCodeMap from '../helpers/httpsMaps';
import { createParticipant, insertParticipant } from '../factories/applicationFactories';
import { cleanUpDb } from '../helpers/cleanUpDb';

const server = supertest(app)

beforeEach(async ()=>{
    await cleanUpDb()
})

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
        expect(res.body).toEqual(expect.objectContaining({
            participantId: expect.any(Number)
        }))
    })
})

describe("Participants /get routes",()=>{
    it("should return NOT FOUND when there is no participant",async ()=>{
        const res = await server.get("/participants")
        expect(res.statusCode).toBe(httsCodeMap.notFound)
    })

    it("should return array of participants",async ()=>{
        await insertParticipant()
        const res = await server.get("/participants")
        expect(res.statusCode).toBe(httsCodeMap.ok)
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id:  expect.any(Number),
                name:  expect.any(String),
                balance:  expect.any(Number),
                createdAt:  expect.any(String),
                updatedAt:  expect.any(String)
            })
        ]))
    })
})