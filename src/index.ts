import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Game } from './game';
import { Moves } from './moves';
import * as crypto from 'crypto';
import { getRandomMove, generateUniqueHash, verifyHash } from './utils';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.static('src/public'));

io.on('connection', (socket) => {

    const game = new Game('Player');

    socket.on('getHash', () => {
        game.computerMove = getRandomMove();
        game.roundSecret = crypto.randomBytes(16).toString('hex');
        game.hashedComputerMove = generateUniqueHash(game.computerMove, game.roundSecret);
        socket.emit('hash', {
            hashedComputerMove: game.hashedComputerMove
        });
    });

    socket.on('playRound', (playerMove: Moves) => {
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

    socket.on('verifyHash', (data: { move: Moves, secret: string, hash: string }) => {
        const isVerified = game.verifyHash(data.move, data.secret, data.hash);
        socket.emit('verificationResult', isVerified ? "Verification is good. Computer doesn't cheat." : "Verification not good. Computer maybe cheats.");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
