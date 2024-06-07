"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
var Choices;
(function (Choices) {
    Choices["Rock"] = "rock";
    Choices["Paper"] = "paper";
    Choices["Scissors"] = "scissors";
})(Choices || (Choices = {}));
const leaderboard = {
    player: 0,
    computer: 0,
    ties: 0
};
function getRandomChoice() {
    const choices = Object.values(Choices);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function choiceToString(choice) {
    return choice;
}
console.log(choiceToString(getRandomChoice()));
function getUserChoice() {
    let userChoice = prompt('Choose rock, paper, or scissors: ').toLowerCase();
    while (!Object.values(Choices).includes(userChoice)) {
        userChoice = prompt('Invalid choice. Please choose rock, paper, or scissors: ').toLowerCase();
    }
    return userChoice;
}
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        leaderboard.ties += 1;
        return 'It\'s a tie!';
    }
    if ((userChoice === Choices.Rock && computerChoice === Choices.Scissors) ||
        (userChoice === Choices.Paper && computerChoice === Choices.Rock) ||
        (userChoice === Choices.Scissors && computerChoice === Choices.Paper)) {
        leaderboard.player += 1;
        return 'You win!';
    }
    else {
        leaderboard.computer += 1;
        return 'You lose!';
    }
}
function displayLeaderboard() {
    console.log('\nLeaderboard:');
    console.log(`Player: ${leaderboard.player}`);
    console.log(`Computer: ${leaderboard.computer}`);
    console.log(`Ties: ${leaderboard.ties}\n`);
}
function playGame() {
    while (true) {
        const computerChoice = getRandomChoice();
        console.log('(The computer has made its choice.)');
        const userChoice = getUserChoice();
        console.log(`You chose: ${choiceToString(userChoice)}`);
        console.log(`The computer chose: ${choiceToString(computerChoice)}`);
        console.log(determineWinner(userChoice, computerChoice));
        displayLeaderboard();
        const playAgain = prompt('Do you want to play again? (yes/no): ').toLowerCase();
        if (playAgain !== 'yes') {
            break;
        }
    }
    console.log('Thanks for playing!');
}
playGame();
