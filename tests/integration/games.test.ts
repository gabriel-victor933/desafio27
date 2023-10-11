import supertest from 'supertest';
import app from '../../src/app';
import httsCodeMap from '../helpers/httpsMaps';
import { createFinishedGame, createGame, insertFinishedGame, insertGame } from '../factories/applicationFactories';
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
        expect(res.body).toEqual(expect.objectContaining({
            gameId: expect.any(Number)
        }))
    })
})

describe("games /GET routes",()=>{
    it("should return NOT FOUND when there isn't any games",async ()=>{
        const res = await server.get("/games")

        expect(res.statusCode).toBe(httsCodeMap.notFound)
    })

    it("should return an array of games",async ()=>{
        await insertGame()
        await insertGame()

        const res = await server.get("/games")

        expect(res.statusCode).toBe(httsCodeMap.ok)
        expect(res.body).toHaveLength(2)
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                homeTeamName:expect.any(String),
                awayTeamName:expect.any(String),
                homeTeamScore:expect.any(Number),
                awayTeamScore: expect.any(Number),
                isFinished: expect.any(Boolean)
            })
        ]))
    })
})

describe("games /GET by id route",()=>{
    it("should return NOT FOUND when there isn't any games",async ()=>{
        const res = await server.get("/games/12")

        expect(res.statusCode).toBe(httsCodeMap.notFound)
    })

    it("should return BAD REQUEST when url is invalid",async ()=>{
        const res = await server.get("/games/a")

        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return a specific game",async ()=>{
        const game = await insertGame()
        const res = await server.get(`/games/${game.id}`)
        expect(res.statusCode).toBe(httsCodeMap.ok)
        expect(res.body).toEqual(
            expect.objectContaining({
                id: game.id,
                createdAt: game.createdAt.toISOString(),
                updatedAt: game.updatedAt.toISOString(),
                homeTeamName: game.homeTeamName,
                awayTeamName: game.awayTeamName,
                homeTeamScore: game.homeTeamScore,
                awayTeamScore: game.awayTeamScore,
                isFinished: game.isFinished,
                bets: expect.any(Array)
            })
        )
    })
})

describe("games /POST finished",()=>{
    it("should return BAD REQUEST when url is invalid",async ()=>{
        const res = await server.post("/games/a/finish").send(createFinishedGame())
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return NOT FOUND when games don't exist",async ()=>{
        const res = await server.post("/games/12/finish").send(createFinishedGame())
        expect(res.statusCode).toBe(httsCodeMap.notFound)
    })

    it("should return BAD REQUEST when game is already finished",async ()=>{
        const game = await insertFinishedGame()
        const res = await server.post(`/games/${game.id}/finish`).send(createFinishedGame())
        console.log(res.body)
        expect(res.statusCode).toBe(httsCodeMap.badRequest)
    })

    it("should return OK",async ()=>{
        const game = await insertGame()
        const res = await server.post(`/games/${game.id}/finish`).send(createFinishedGame())
        expect(res.statusCode).toBe(httsCodeMap.ok)
    })
})

