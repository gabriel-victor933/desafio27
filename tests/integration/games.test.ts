import supertest from 'supertest';
import app from '../../src/app';
import httsCodeMap from '../helpers/httpsMaps';
import { createGame } from '../factories/applicationFactories';
import { cleanUpDb } from '../helpers/cleanUpDb';

const server = supertest(app)

beforeEach(async ()=>{
    await cleanUpDb()
})

describe("games /POST routes",()=>{
    it("should return BAD REQUEST if body is invalid",async ()=>{
        const res = await server.post("/games").send({})
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return CREATED if body is valid",async () => {
        const res = await server.post("/games").send(createGame())
        expect(res.statusCode).toBe(httsCodeMap.created)
    })

})


