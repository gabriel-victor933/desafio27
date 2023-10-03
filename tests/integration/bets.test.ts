import supertest from 'supertest';
import app from '../../src/app';
import httsCodeMap from '../helpers/httpsMaps';
import { createBet, insertGame, insertParticipant,insertFinishedGame } from '../factories/applicationFactories';
import { cleanUpDb } from '../helpers/cleanUpDb';

const server = supertest(app)

beforeEach(async ()=>{
    await cleanUpDb()
})

describe("bets /POST route",()=>{
    it("should return NOT FOUND if participant doesn't exist",async ()=>{
        const game = await insertGame()
        const res = await server.post("/bets").send(createBet(game.id,23,2000))
        expect(res.statusCode).toBe(httsCodeMap.notFound)

    })

    it("should return NOT FOUND if game doesn't exist",async ()=>{
        const participant = await  insertParticipant()
        const res = await server.post("/bets").send(createBet(23,participant.id,participant.balance -100))
        expect(res.statusCode).toBe(httsCodeMap.notFound)
    })

    it("should return FORBIDDEN if game have already finished",async ()=>{
        const participant = await  insertParticipant()
        const game = await insertFinishedGame()
        const res = await server.post("/bets").send(createBet(game.id,participant.id,participant.balance -100))
        expect(res.statusCode).toBe(httsCodeMap.forbidden)
    })

    it("should return BAD REQUEST if participant don't have enough balance",async ()=>{
        const participant = await  insertParticipant()
        const game = await insertGame()
        const res = await server.post("/bets").send(createBet(game.id,participant.id,participant.balance +1000))
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return CREATE",async ()=>{
        const participant = await  insertParticipant()
        const game = await insertGame()
        const res = await server.post("/bets").send(createBet(game.id,participant.id,participant.balance -100))
        expect(res.statusCode).toBe(httsCodeMap.created)
    })
})