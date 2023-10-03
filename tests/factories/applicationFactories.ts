import { faker } from '@faker-js/faker';
import {prisma} from "../../src/config/db"

export function createParticipant(haveMinBalance = true){

    if(haveMinBalance){
        return {
            name: faker.person.firstName(),
            balance: faker.number.int({min: 1000, max: 50000})
        }
    }

    return {
        name: faker.person.firstName(),
        balance: faker.number.int({min: 10, max: 1000})
    }
    
}

export async function insertParticipant(){
    return await prisma.participant.create({
        data: createParticipant()
    })
}

export function createGame(){
    return {
        homeTeamName: faker.company.buzzNoun(),
        awayTeamName: faker.company.buzzNoun()
    }
}

export async function insertGame(){
    return await prisma.game.create({
        data: createGame()
    })
}

