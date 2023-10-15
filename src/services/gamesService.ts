import { notFoundException } from "../utils/errors";
import gamesRepositories from "../repositories/gamesRepositories";
import { createGame, finishGame,BetsResults } from "../utils/protocols";
import { invalidRequestException } from "../utils/errors";

const TAX = 0.3

async function PostGame(body: createGame){
    const res = await gamesRepositories.postGames(body)
    return {gameId: res.id}
}

async function getGame(page: number){
    const games = await gamesRepositories.getGames(page)
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
    const betsLosted:number[] = []

    bets.forEach((bet) =>{
        totalAmount += bet.amountBet;
        if(checkBet(bet,body)){
            totalWinnerAmount += bet.amountBet
        } else {
            betsLosted.push(bet.id)
        }
    })
    const ratio = (1 - TAX)*totalAmount/totalWinnerAmount
    
    const betsResults: BetsResults[] = []
    bets.forEach((bet) => {
        if(checkBet(bet,body)){
            betsResults.push({
                id: bet.id,
                amountWon: bet.amountBet*ratio,
                participantId: bet.participantId
            }) 
        }
    })

    await gamesRepositories.postFinishGame(id,body,betsLosted,betsResults)
}

function checkBet(bet:Bet,gameResult: finishGame){
    return (bet.homeTeamScore == gameResult.homeTeamScore && bet.awayTeamScore == gameResult.awayTeamScore);
}

const gamesServices = {
    PostGame,
    getGame,
    getGameById,
    postFinishGame
}

export default gamesServices

type Bet =  {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number;
    status: string;
    amountWon: number;
    gameId: number;
    participantId: number;
}