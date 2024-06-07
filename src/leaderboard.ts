export class leaderboards {
  private scores: { [key: string]: number };

  constructor() {
    this.scores = { player: 0, computer: 0, tie: 0 };
  }

  updateScores(result: string): void {
    if (result in this.scores) {
      this.scores[result]++;
    }
  }

  getScores(): { [key: string]: number } {
    return this.scores;
  }
}
