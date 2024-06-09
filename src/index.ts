import * as readline from 'readline-sync';
import { Game } from './game';

const playerName = readline.question('Write your name: ');
const game = new Game(playerName);

while (true) {
    game.playRound();
    game.showLeaderboard();
    const playAgain = readline.question('Do u want to play again ? (yes/no): ').toLowerCase();
    if (playAgain !== 'yes') {
        break;
    }
}

console.log('Thanks for playing!');
