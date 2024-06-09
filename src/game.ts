import { Player } from './player';
import { Moves } from './moves';

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
}