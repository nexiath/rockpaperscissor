"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('src/public'));
io.on('connection', (socket) => {
    console.log('A user connected');
    const game = new game_1.Game('Player');
    socket.on('playRound', (playerMove) => {
        game.playerMove = playerMove;
        game.playRound();
        socket.emit('update', {
            playerMove: game.playerMove,
            computerMove: game.computerMove,
            playerScore: game['player'].score,
            computerScore: game['computer'].score,
            draws: game['draws'],
            roundSecret: game.roundSecret,
            hashedComputerMove: game.hashedComputerMove
        });
    });
    socket.on('verifyHash', (data) => {
        const isVerified = game.verifyHash(data.move, data.secret, data.hash);
        socket.emit('verificationResult', isVerified ? "Verification is good. Computer doesn't cheat." : "Verification not good. Computer maybe cheats.");
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
