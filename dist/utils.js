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
exports.verifyHash = exports.determineWinner = exports.generateUniqueHash = exports.getRandomMove = void 0;
const crypto = __importStar(require("crypto"));
const moves_1 = require("./moves");
// Random move
function getRandomMove() {
    const moves = [moves_1.Moves.Rock, moves_1.Moves.Paper, moves_1.Moves.Scissors];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
exports.getRandomMove = getRandomMove;
// Unique Hash per round
function generateUniqueHash(move, secret) {
    return crypto.createHmac('sha256', secret).update(move).digest('hex');
}
exports.generateUniqueHash = generateUniqueHash;
// Winner determine
function determineWinner(movePlayer, moveComputer) {
    if (movePlayer === moveComputer) {
        return "Tie";
    }
    if ((movePlayer === moves_1.Moves.Rock && moveComputer === moves_1.Moves.Scissors) ||
        (movePlayer === moves_1.Moves.Paper && moveComputer === moves_1.Moves.Rock) ||
        (movePlayer === moves_1.Moves.Scissors && moveComputer === moves_1.Moves.Paper)) {
        return "You win";
    }
    else {
        return "You lose";
    }
}
exports.determineWinner = determineWinner;
// Hash verification
function verifyHash(move, secret, hash) {
    const generatedHash = generateUniqueHash(move, secret);
    return generatedHash === hash;
}
exports.verifyHash = verifyHash;
