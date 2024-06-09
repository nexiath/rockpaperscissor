"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineWinner = exports.getRandomMove = void 0;
const moves_1 = require("./moves");
// Mouvement aléatoire
function getRandomMove() {
    const moves = [moves_1.Moves.Rock, moves_1.Moves.Paper, moves_1.Moves.Scissors];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
exports.getRandomMove = getRandomMove;
// Déterminer le gagnant
function determineWinner(movePlayer, moveComputer) {
    if (movePlayer === moveComputer) {
        return "Égalité";
    }
    if ((movePlayer === moves_1.Moves.Rock && moveComputer === moves_1.Moves.Scissors) ||
        (movePlayer === moves_1.Moves.Paper && moveComputer === moves_1.Moves.Rock) ||
        (movePlayer === moves_1.Moves.Scissors && moveComputer === moves_1.Moves.Paper)) {
        return "Vous avez gagné";
    }
    else {
        return "Vous avez perdu";
    }
}
exports.determineWinner = determineWinner;
