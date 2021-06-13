class Result {
    static moneyWinInGame(result, bid) {
        if (result) return 3 * bid;
        else return 0;
    }

    static checkWinner(draw) {
        if ((draw[0].shape === draw[1].shape && draw[1].shape === draw[2].shape) || (draw[0].color === draw[1].color && draw[1].color === draw[2].color)) {
            return true;
        } else {
            return false;
        }
    }
}