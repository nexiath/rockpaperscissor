import { Moves } from './moves';

// Mouvement aléatoire
export function getRandomMove(): Moves {
    const moves = [Moves.Rock, Moves.Paper, Moves.Scissors];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}


// Déterminer le gagnant
export function determineWinner(movePlayer: Moves, moveComputer: Moves): string {
    if (movePlayer === moveComputer) {
        return "Égalité";
    }

    if ((movePlayer === Moves.Rock && moveComputer === Moves.Scissors) ||
        (movePlayer === Moves.Paper && moveComputer === Moves.Rock) ||
        (movePlayer === Moves.Scissors && moveComputer === Moves.Paper)) {
        return "Vous avez gagné";
    } else {
        return "Vous avez perdu";
    }
}
