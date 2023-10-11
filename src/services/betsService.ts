import { createBet } from "../utils/protocols";
import betsRepositories from "../repositories/betsRepositories";

async function postBet(body: createBet){
    const bet = await betsRepositories.postBet(body)
    return {betId: bet.id}
}

const betsServices = {
    postBet
}

export default betsServices