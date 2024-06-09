"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const player_1 = require("./player");
const utils_1 = require("./utils");
const input_1 = require("./input");
class Game {
    constructor(playerName) {
        this.player = new player_1.Player(playerName);
        this.computer = new player_1.Player("Computer");
        this.draws = 0;
        this.playerMove = null;
        this.computerMove = null;
    }
    // Play a round
    playRound() {
        this.computerMove = (0, utils_1.getRandomMove)();
        this.playerMove = (0, input_1.getPlayerMove)();
        if (!this.playerMove) {
            console.log('Mouvement invalide, essayez encore.');
            return;
        }
        console.log(`Ordinateur: ${this.computerMove}`);
        const result = (0, utils_1.determineWinner)(this.playerMove, this.computerMove);
        console.log(result);
        if (result === "Vous avez gagné") {
            this.player.increaseScore();
        }
        else if (result === "Vous avez perdu") {
            this.computer.increaseScore();
        }
        else {
            this.draws += 1;
        }
    }
    // Score
    showLeaderboard() {
        console.log("\n--- Leaderboard ---");
        console.log(`Joueur (${this.player.nom}): ${this.player.score}`);
        console.log(`Ordinateur: ${this.computer.score}`);
        console.log(`Égalités: ${this.draws}`);
        console.log("-------------------\n");
    }
}
exports.Game = Game;
