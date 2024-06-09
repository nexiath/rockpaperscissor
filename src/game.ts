import { Player } from './player';
import { Moves } from './moves';
import { getRandomMove, determineWinner } from './utils';
import { getPlayerMove } from './input';

export class Game {
    private player: Player;
    private computer: Player;
    private draws: number;
    private playerMove: Moves | null;
    private computerMove: Moves | null;

    constructor(playerName: string) {
        this.player = new Player(playerName);
        this.computer = new Player("Computer");
        this.draws = 0;
        this.playerMove = null;
        this.computerMove = null;
    }

    // Play a round
    public playRound(): void {
        this.computerMove = getRandomMove();

        this.playerMove = getPlayerMove();
        if (!this.playerMove) {
            console.log('Mouvement invalide, essayez encore.');
            return;
        }

        console.log(`Ordinateur: ${this.computerMove}`);

        const result = determineWinner(this.playerMove, this.computerMove);
        console.log(result);

        if (result === "Vous avez gagné") {
            this.player.increaseScore();
        } else if (result === "Vous avez perdu") {
            this.computer.increaseScore();
        } else {
            this.draws += 1;
        }

    }

    // Score
    public showLeaderboard(): void {
        console.log("\n--- Leaderboard ---");
        console.log(`Joueur (${this.player.nom}): ${this.player.score}`);
        console.log(`Ordinateur: ${this.computer.score}`);
        console.log(`Égalités: ${this.draws}`);
        console.log("-------------------\n");
    }
}
