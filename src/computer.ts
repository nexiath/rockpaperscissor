import { Moves } from "./utils";

export class Computer{
    private moves: Moves[] = [Moves.Paper, Moves.Rock, Moves.Scissors]

    getMove(): Moves{
        const randomIndex = Math.floor(Math.random() * this.moves.length);
        return this.moves[randomIndex];
    }
}