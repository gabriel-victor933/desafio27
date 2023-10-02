import { notFoundException } from "../utils/errors";
import gamesRepositories from "../repositories/gamesRepositories";
import { createGame } from "../utils/protocols";

async function PostGame(body: createGame){
    return await gamesRepositories.postGames(body)
}

async function getGame(){
    const games = await gamesRepositories.getGames()
    if(games.length === 0) throw new Error("games not found")
    return games
}

async function getGameById(id: number) {
    const game =  await gamesRepositories.getGamesById(id)
    if(!game) throw notFoundException("Game not found, check the id!")

    return game
}

const gamesServices = {
    PostGame,
    getGame,
    getGameById
}

export default gamesServices