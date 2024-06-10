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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
const crypto = __importStar(require("crypto"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('src/public'));
io.on('connection', (socket) => {
    const game = new game_1.Game('Player');
    socket.on('getHash', () => {
        game.computerMove = (0, utils_1.getRandomMove)();
        game.roundSecret = crypto.randomBytes(16).toString('hex');
        game.hashedComputerMove = (0, utils_1.generateUniqueHash)(game.computerMove, game.roundSecret);
        socket.emit('hash', {
            hashedComputerMove: game.hashedComputerMove
        });
    });
    socket.on('playRound', (playerMove) => {
        game.playerMove = playerMove;
        game.playRound();
        socket.emit('update', {
            playerMove: game.playerMove,
            computerMove: game.computerMove,
            playerScore: game['player'].score,
            computerScore: game['computer'].score,
            draws: game['draws'],
            roundSecret: game.roundSecret
        });
    });
    socket.on('verifyHash', (data) => {
        const isVerified = game.verifyHash(data.move, data.secret, data.hash);
        socket.emit('verificationResult', isVerified ? "Verification is good. Computer doesn't cheat." : "Verification not good. Computer maybe cheats.");
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
