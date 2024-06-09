export class Player {
    nom: string;
    score: number;

    constructor(nom: string) {
        this.nom = nom;
        this.score = 0;
    }

    increaseScore(): void {
        this.score += 1;
    }

    resetScore(): void {
        this.score = 0;
    }
}
