import * as crypto from 'crypto';
import { Moves } from './moves';

// Random move
export function getRandomMove(): Moves {
    const moves = [Moves.Rock, Moves.Paper, Moves.Scissors];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

// Unique Hash per round
export function generateUniqueHash(move: Moves, secret: string): string {
    return crypto.createHmac('sha256', secret).update(move).digest('hex');
}

// Winner determine
export function determineWinner(movePlayer: Moves, moveComputer: Moves): string {
    if (movePlayer === moveComputer) {
        return "Tie";
    }

    if ((movePlayer === Moves.Rock && moveComputer === Moves.Scissors) ||
        (movePlayer === Moves.Paper && moveComputer === Moves.Rock) ||
        (movePlayer === Moves.Scissors && moveComputer === Moves.Paper)) {
        return "You win";
    } else {
        return "You lose";
    }
}

// Hash verification
export function verifyHash(move: Moves, secret: string, hash: string): boolean {
    const generatedHash = generateUniqueHash(move, secret);
    return generatedHash === hash;
}
