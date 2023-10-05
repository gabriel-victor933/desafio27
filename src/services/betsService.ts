import { createBet } from "../utils/protocols";
import betsRepositories from "../repositories/betsRepositories";

async function postBet(body: createBet){
    await betsRepositories.postBet(body)
}

const betsServices = {
    postBet
}

export default betsServices