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
exports.getVerificationInputs = exports.askForVerification = exports.getPlayerMove = void 0;
const readline = __importStar(require("readline-sync"));
const moves_1 = require("./moves");
// Player movement
function getPlayerMove() {
    const moveInput = readline.question('Chose a movement (Rock, Paper, Scissors): ').toLowerCase();
    if (moveInput === 'rock') {
        return moves_1.Moves.Rock;
    }
    else if (moveInput === 'paper') {
        return moves_1.Moves.Paper;
    }
    else if (moveInput === 'scissors') {
        return moves_1.Moves.Scissors;
    }
    else {
        return null;
    }
}
exports.getPlayerMove = getPlayerMove;
// Hash verification if player want or not
function askForVerification() {
    const verifyInput = readline.question('Do u want to verify if the computer have cheat or not ? (yes/no): ').toLowerCase();
    return verifyInput === 'yes';
}
exports.askForVerification = askForVerification;
// Verfiication entry
function getVerificationInputs() {
    const moveInput = readline.question('Write the movement of the computer (Rock, Paper, Scissors): ').toLowerCase();
    const secret = readline.question('Write the secret key: ');
    const hash = readline.question('Write the hash: ');
    let move;
    if (moveInput === 'rock') {
        move = moves_1.Moves.Rock;
    }
    else if (moveInput === 'paper') {
        move = moves_1.Moves.Paper;
    }
    else if (moveInput === 'scissors') {
        move = moves_1.Moves.Scissors;
    }
    else {
        throw new Error('Invalid entry');
    }
    return { move, secret, hash };
}
exports.getVerificationInputs = getVerificationInputs;
