import * as crypto from 'crypto';
import { Player } from './player';
import { Moves } from './moves';
import { determineWinner, verifyHash } from './utils';

export class Game {
    private player: Player;
    private computer: Player;
    private draws: number;
    public playerMove: Moves | null;
    public computerMove: Moves | null;
    public roundSecret: string;
    public hashedComputerMove: string;

    constructor(playerName: string) {
        this.player = new Player(playerName);
        this.computer = new Player("Computer");
        this.draws = 0;
        this.playerMove = null;
        this.computerMove = null;
        this.roundSecret = crypto.randomBytes(16).toString('hex');
        this.hashedComputerMove = '';
    }

    public playRound(): void {
        if (!this.playerMove) {
            console.log('Movement not valid, try again.');
            return;
        }

        const result = determineWinner(this.playerMove, this.computerMove!);
        console.log(result);

        if (result === "You win") {
            this.player.increaseScore();
        } else if (result === "You lose") {
            this.computer.increaseScore();
        } else {
            this.draws += 1;
        }
    }

    public verifyHash(move: Moves, secret: string, hash: string): boolean {
        return verifyHash(move, secret, hash);
    }

    public showLeaderboard(): void {
        console.log("\n--- Leaderboard ---");
        console.log(`Player (${this.player.nom}): ${this.player.score}`);
        console.log(`Computer: ${this.computer.score}`);
        console.log(`Tie: ${this.draws}`);
        console.log("-------------------\n");
    }
}
