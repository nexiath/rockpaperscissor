import * as crypto from 'crypto';
import { Player } from './player';
import { Moves } from './moves';
import { getRandomMove, generateUniqueHash, determineWinner, verifyHash } from './utils';
import { getPlayerMove, askForVerification, getVerificationInputs } from './input';

export class Game {
    private player: Player;
    private computer: Player;
    private draws: number;
    private playerMove: Moves | null;
    private computerMove: Moves | null;
    private secretKey: string;

    constructor(playerName: string) {
        this.player = new Player(playerName);
        this.computer = new Player("Computer");
        this.draws = 0;
        this.playerMove = null;
        this.computerMove = null;
        this.secretKey = crypto.randomBytes(16).toString('hex');
    }

    // Play round
    public playRound(): void {
        this.computerMove = getRandomMove();
        const roundSecret = crypto.randomBytes(16).toString('hex');
        const hashedComputerMove = generateUniqueHash(this.computerMove, roundSecret);

        console.log(`Computer chose his movement. Hash: ${hashedComputerMove}`);

        this.playerMove = getPlayerMove();
        if (!this.playerMove) {
            console.log('Movement not valid, try again.');
            return;
        }

        console.log(`Computer: ${this.computerMove}`);
        console.log(`Secret key of this round: ${roundSecret}`);

        const result = determineWinner(this.playerMove, this.computerMove);
        console.log(result);

        if (result === "You win") {
            this.player.increaseScore();
        } else if (result === "You lose") {
            this.computer.increaseScore();
        } else {
            this.draws += 1;
        }

        if (askForVerification()) {
            const { move, secret, hash } = getVerificationInputs();
            const isVerified = verifyHash(move, secret, hash);
            if (isVerified) {
                console.log("Verification is good. Computer dont cheat.");
            } else {
                console.log("Verification not good. Computer maybe cheat.");
            }
        }
    }

    // Score
    public showLeaderboard(): void {
        console.log("\n--- Leaderboard ---");
        console.log(`Player (${this.player.nom}): ${this.player.score}`);
        console.log(`Computer: ${this.computer.score}`);
        console.log(`Tie: ${this.draws}`);
        console.log("-------------------\n");
    }
}
