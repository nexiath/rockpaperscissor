"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(nom) {
        this.nom = nom;
        this.score = 0;
    }
    increaseScore() {
        this.score += 1;
    }
    resetScore() {
        this.score = 0;
    }
}
exports.Player = Player;
