import * as readline from 'readline-sync';
import { Moves } from './moves';

// Player movre
export function getPlayerMove(): Moves | null {
    const moveInput = readline.question('Entrez votre mouvement (Rock, Paper, Scissors): ').toLowerCase();

    if (moveInput === 'rock') {
        return Moves.Rock;
    } else if (moveInput === 'paper') {
        return Moves.Paper;
    } else if (moveInput === 'scissors') {
        return Moves.Scissors;
    } else {
        return null;
    }
}
