import * as readline from 'readline-sync';
import { Moves } from './moves';

// Player movement
export function getPlayerMove(): Moves | null {
    const moveInput = readline.question('Chose a movement (Rock, Paper, Scissors): ').toLowerCase();

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

// Hash verification if player want or not
export function askForVerification(): boolean {
    const verifyInput = readline.question('Do u want to verify if the computer have cheat or not ? (yes/no): ').toLowerCase();
    return verifyInput === 'yes';
}

// Verfiication entry
export function getVerificationInputs(): { move: Moves, secret: string, hash: string } {
    const moveInput = readline.question('Write the movement of the computer (Rock, Paper, Scissors): ').toLowerCase();
    const secret = readline.question('Write the secret key: ');
    const hash = readline.question('Write the hash: ');

    let move: Moves;
    if (moveInput === 'rock') {
        move = Moves.Rock;
    } else if (moveInput === 'paper') {
        move = Moves.Paper;
    } else if (moveInput === 'scissors') {
        move = Moves.Scissors;
    } else {
        throw new Error('Invalid entry');
    }

    return { move, secret, hash };
}
