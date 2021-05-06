class Statistics {
    constructor() {
        this.gameResults = [];
    }

    //method to add result from single game
    addGameToStatistics(win, bet) {
        let gameResult = {
            win: win,
            bet: bet
        }
        this.gameResults.push(gameResult);
    }

    //method to sum up results from all games
    showGameStatistics() {
        let numOfGames = this.gameResults.length;
        let numOfWins = this.gameResults.filter(result => result.win).length;
        let numOfLosses = this.gameResults.filter(result => !result.win).length;
        return [numOfGames, numOfWins, numOfLosses];
    }
}