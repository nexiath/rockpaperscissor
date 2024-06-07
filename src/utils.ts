export enum Moves {
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors'
}

export function determineGagnant(playerMove: Moves, computerMove: Moves): string {
    if(playerMove === computerMove){
        return "tie"
    }
    if((playerMove === Moves.Rock && computerMove === Moves.Scissors) || 
    (playerMove === Moves.Paper && computerMove === Moves.Paper) ||
    (playerMove === Moves.Scissors && computerMove === Moves.Rock)){
        return "You win !"
    } else {
        return "You Lose !"
    }
}