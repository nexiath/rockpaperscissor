import * as readline from 'readline-sync';
import { Game } from './game';

const playerName = readline.question('Entrez votre nom: ');
const game = new Game(playerName);

while (true) {
    game.playRound();
    game.showLeaderboard();
    const playAgain = readline.question('Voulez-vous rejouer ? (oui/non): ').toLowerCase();
    if (playAgain !== 'oui') {
        break;
    }
}

console.log('Merci d\'avoir joué !');
