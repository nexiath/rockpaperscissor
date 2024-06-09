"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const crypto = __importStar(require("crypto"));
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
        this.secretKey = crypto.randomBytes(16).toString('hex');
    }
    // Play round
    playRound() {
        this.computerMove = (0, utils_1.getRandomMove)();
        const roundSecret = crypto.randomBytes(16).toString('hex');
        const hashedComputerMove = (0, utils_1.generateUniqueHash)(this.computerMove, roundSecret);
        console.log(`Computer chose his movement. Hash: ${hashedComputerMove}`);
        this.playerMove = (0, input_1.getPlayerMove)();
        if (!this.playerMove) {
            console.log('Movement not valid, try again.');
            return;
        }
        console.log(`Computer: ${this.computerMove}`);
        console.log(`Secret key of this round: ${roundSecret}`);
        const result = (0, utils_1.determineWinner)(this.playerMove, this.computerMove);
        console.log(result);
        if (result === "You win") {
            this.player.increaseScore();
        }
        else if (result === "You lose") {
            this.computer.increaseScore();
        }
        else {
            this.draws += 1;
        }
        if ((0, input_1.askForVerification)()) {
            const { move, secret, hash } = (0, input_1.getVerificationInputs)();
            const isVerified = (0, utils_1.verifyHash)(move, secret, hash);
            if (isVerified) {
                console.log("Verification is good. Computer dont cheat.");
            }
            else {
                console.log("Verification not good. Computer maybe cheat.");
            }
        }
    }
    // Score
    showLeaderboard() {
        console.log("\n--- Leaderboard ---");
        console.log(`Player (${this.player.nom}): ${this.player.score}`);
        console.log(`Computer: ${this.computer.score}`);
        console.log(`Tie: ${this.draws}`);
        console.log("-------------------\n");
    }
}
exports.Game = Game;
