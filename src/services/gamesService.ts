import { notFoundException } from "../utils/errors";
import gamesRepositories from "../repositories/gamesRepositories";
import { createGame, finishGame } from "../utils/protocols";
import { invalidRequestException } from "../utils/errors";

const TAX = 0.3

async function PostGame(body: createGame){
    return await gamesRepositories.postGames(body)
}

async function getGame(){
    const games = await gamesRepositories.getGames()
    if(games.length === 0) throw notFoundException("Games not found!")
    return games
}

async function getGameById(id: number) {
    const game =  await gamesRepositories.getGamesById(id)
    if(!game) throw notFoundException("Game not found, check the id!")
    return game
}

async function postFinishGame(id: number, body: finishGame){
    const game = await getGameById(id)

    if(!game) throw invalidRequestException("game doenst exist, check the id!")
    if(game.isFinished) throw invalidRequestException("game have already been finished!")
    const bets = game.bets

    let totalAmount = 0
    let totalWinnerAmount = 0
    const losers:number[] = []

    

    bets.forEach((bet) =>{
        totalAmount += bet.amountBet;
        if(bet.homeTeamScore == body.homeTeamScore && bet.awayTeamScore == body.awayTeamScore){
            totalWinnerAmount += bet.amountBet
        } else {
            losers.push(bet.id)
        }
    })
    const ratio = (1 - TAX)*totalAmount/totalWinnerAmount
    
    const betsResults = []
    bets.forEach((bet) => {
        if(bet.homeTeamScore == body.homeTeamScore && bet.awayTeamScore == body.awayTeamScore){
            betsResults.push({
                id: bet.id,
                amountWon: bet.amountBet*ratio
            }) 
        }
    })

    await gamesRepositories.postFinishGame(id,body,ratio,losers,betsResults)
}

const gamesServices = {
    PostGame,
    getGame,
    getGameById,
    postFinishGame
}

export default gamesServices