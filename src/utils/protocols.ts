export type createParticipant = {
    name: string,
    balance: number
}

export type createGame = {
    homeTeamName: string,
    awayTeamName: string
}

export type createBet = {
    homeTeamScore: number,
    awayTeamScore: number,
    amountBet: number,
    gameId: number,
    participantId: number
}