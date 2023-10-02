import gamesRepositories from "../repositories/gamesRepositories";
import { createGame } from "../protocols";

async function PostGame(body: createGame){
    return await gamesRepositories.postGames(body)
}

async function getGame(){
    const games = await gamesRepositories.getGames()
    if(games.length === 0) throw new Error("games not found")
    return games
}

const gamesServices = {
    PostGame,
    getGame
}

export default gamesServices