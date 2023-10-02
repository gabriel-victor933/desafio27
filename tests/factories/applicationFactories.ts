import { faker } from '@faker-js/faker';

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